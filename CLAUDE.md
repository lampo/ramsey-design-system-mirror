# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Ramsey Design System - a multi-platform design system supporting React, Vue 3, and Freemarker. It's a Lerna monorepo using Yarn workspaces.

## Build & Development Commands

### Initial Setup

```bash
# Install dependencies (Yarn is required)
yarn

# First build (required before starting Storybook)
yarn build
```

### Development

```bash
# Start React Storybook on port 1234
yarn start

# Start Vue Storybook
yarn start:vue

# Start both React and Vue Storybook simultaneously
yarn start:all

# Build all packages
yarn build

# Build without icons (faster for iteration)
yarn build:no-icons

# Watch mode for development
yarn build:watch
```

### Testing

```bash
# Run all JavaScript/TypeScript tests (Jest)
yarn test

# Run a specific test file
yarn test components/Button/test/Button.test.js

# Run tests matching a pattern
yarn test --testNamePattern="Button"

# Run tests in watch mode
yarn test --watch
```

### Linting & Formatting

```bash
# Lint everything
yarn lint

# Lint JavaScript
yarn lint:js

# Lint SCSS
yarn lint:scss

# Format all files
yarn format
```

## Architecture

### Monorepo Structure

This is a Lerna independent versioning monorepo with the following workspaces:

- **`components/`** - Individual design system components (Alert, Avatar, Button, Card, etc.)
- **`tokens/`** - Design tokens built with Style Dictionary
- **`icons/`** - Icon package
- **`common/`** - Shared utilities and base styles

Each component is an independent npm package published to Artifactory.

### Multi-Platform Components

Most components support 3 platforms:

1. **React (TypeScript)** - Primary implementation
   - Source: `ComponentName.tsx`
   - Build output: `dist/ComponentName.{cjs,esm}.js`
   - Built with Rollup + TypeScript plugin

2. **Vue 3** - Secondary implementation
   - Source: `ComponentName.vue` or `vue/ComponentName.vue`
   - Build output: `dist/vue/ComponentName.{cjs,esm}.js`
   - Built with Rollup + rollup-plugin-vue

3. **Freemarker** - Template-based
   - Source: `component_name.ftl`
   - Tests: `test/ComponentNameTest.java`
   - Tested with Maven (see `pom.xml`)

### Component Package Structure

Each component follows this pattern:

```
components/ComponentName/
├── ComponentName.tsx          # React implementation
├── ComponentName.vue          # Vue 3 implementation (or vue/ subdirectory)
├── component_name.ftl         # Freemarker template
├── sass/                      # Component styles
│   └── _index.scss
├── test/                      # All test files
│   ├── ComponentName.test.js       # React tests
│   ├── ComponentName.vue.test.js   # Vue tests
│   └── ComponentNameTest.java      # Freemarker tests
├── stories/                   # Storybook stories
├── types/                     # TypeScript type definitions
├── dist/                      # Build output (gitignored)
├── package.json
├── rollup.config.mjs
└── tsconfig.json
```

### Vue 3 Implementation Patterns

When implementing Vue versions of React components, follow these patterns:

#### Component Structure

```vue
<script>
export default { name: "RdsComponentName", inheritAttrs: false }
</script>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  size: { type: String, default: "md" },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(["update:modelValue"])

// Expose ref for parent access (equivalent to forwardRef)
const el = ref(null)
defineExpose({ el })
</script>

<template>
  <div ref="el" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
```

#### Key Pattern Translations

**Refs: forwardRef → Template Refs + defineExpose**
```javascript
// React
const Component = forwardRef((props, ref) => (
  <div ref={ref}>...</div>
));

// Vue
<script setup>
const el = ref(null)
defineExpose({ el })
</script>
<template>
  <div ref="el">...</div>
</template>
```

**State Management: Context → Provide/Inject**
```javascript
// React
const Context = createContext();
<Context.Provider value={state}>
  {children}
</Context.Provider>

// Vue
const ContextKey = Symbol("Context")
provide(ContextKey, state)
const context = inject(ContextKey)
```

**Trigger Customization: cloneElement → Scoped Slots**
```javascript
// React
React.cloneElement(trigger, { onClick: handleClick })

// Vue
<slot name="trigger" :onClick="handleClick"></slot>
```

**Portals: createPortal → Teleport**
```javascript
// React
createPortal(<div>...</div>, document.body)

// Vue
<Teleport to="body">
  <div>...</div>
</Teleport>
```

**v-model Support**
```vue
<script setup>
const emit = defineEmits(["update:modelValue"])
const handleChange = (e) => {
  emit("update:modelValue", e.target.checked)
}
</script>
```

#### Compound Components

React uses property attachment, Vue uses slot detection:

```javascript
// React
Card.Header = Header;
Card.Body = Body;

// Vue - Use useSlots() + findChildSlot()
// See components/Card/vue/Card.vue for reference
```

#### Reference Components

- **Simple**: `Button.vue`, `Alert.vue`, `Input.vue`
- **Form controls**: `Checkbox.vue`, `Input.vue` (v-model patterns)
- **Compound**: `Card.vue` (slot detection with findChildSlot)

### Build System

- **JavaScript/TypeScript**: Rollup with separate configs per component
  - Each component has its own `rollup.config.mjs`
  - Outputs both CJS and ESM formats
  - React and Vue builds are separate entries
  - Build command: `yarn build:js` (via `npm-run-all`)

- **Styles**: Sass compilation
  - Build command: `yarn build:css`
  - Output: `dist/component_name.css`
  - Loaded from `../../node_modules/` for shared dependencies

- **Tokens**: Style Dictionary custom build
  - Source: `tokens/properties/`
  - Build script: `tokens/build.mjs`
  - Outputs JSON, SCSS, CSS variables, TypeScript, Tailwind config, etc.

### Testing

- **JavaScript**: Jest with `ts-jest` and `@vue/vue3-jest`
  - Config: `jest.config.js` at root
  - React: `@testing-library/react`
  - Vue: `@testing-library/vue`

- **Freemarker**: JUnit with Maven
  - Tests in `test/*Test.java`
  - Run: `mvn test`

## Generating New Components

Use hygen templates to scaffold new components:

```bash
# React component (also creates Lerna package structure)
yarn generate:react-component <component_name>

# Vue component
yarn generate:vue-component <component_name>

# Freemarker macro
yarn generate:freemarker-macro <component_name>
```

**Important**: Component names must use snake_case (e.g., `data_table`).

## Releasing

### Lerna Package Releases

Releases are handled via GitLab CI/CD pipelines:

1. Merge changes to `master`
2. Pipeline builds and tests automatically
3. Manually trigger the `deploy-packages` job in GitLab
4. Lerna will:
   - Detect changed packages since last release
   - Version them using conventional commits
   - Publish to Artifactory npm registry
   - Create git tags

**Graduating to 1.0.0**:
1. Create MR changing package version to `"1.0.0-release"` in `package.json`
2. Title: `chore(PACKAGE_NAME): prep for v1 release`
3. Lerna's `--conventional-graduate` flag promotes it to `1.0.0` on release

## React Version Support

Supports React 17, 18, and 19. React 16 is no longer supported.

## Storybook Configuration

- React config: `.storybook/config/react/`
- Vue config: `.storybook/config/vue/`
- Shared preview: `.storybook/config/basePreview.js`
- Preview files in components: `components/*/stories/` (automatically discovered)

## CI/CD

Configuration: `.cicd/.gitlab-ci.yml`

Pipeline stages:
1. **build** - `yarn && yarn build`
2. **test** - Runs in parallel:
   - `test-js` - Runs on JS/TS/Vue file changes or on master
   - `test-freemarker` - Runs on .ftl file changes or on master
3. **deploy** - Manual trigger to publish packages via Lerna (master branch only)

**Important**: In MRs, tests run conditionally based on file changes to optimize CI time. On master branch, all tests run regardless of changes.

## Important Files

- **`lerna.json`** - Lerna config with conventional commits and independent versioning
- **`package.json`** - Root workspace config and shared dev dependencies
- **`eslint.config.mjs`** - ESLint flat config (new format) with TypeScript, React, and Storybook rules
- **`tokens/build.mjs`** - Custom Style Dictionary build with transforms/formats
- **`common/`** - Shared React utilities, TypeScript types, and base styles

## Development Notes

- Always run `yarn build` before starting Storybook the first time
- Use `yarn build:watch` for rapid iteration on component changes
- Build artifacts in `dist/` are gitignored
- Lerna ignores changes to `*.md`, `*.mdx`, `doc/**`, tests, and stories for versioning

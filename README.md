# Ramsey Design System

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://design.ramseysolutions.com/storybook/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Getting Started

Visit our documentation site to get up and running with Ramsey Design System.

[Read the Docs →](https://design.ramseysolutions.com)

## React Version Support

**React 16 is no longer supported.**  
We now support React 17, 18, and 19. Please ensure your consuming application uses one of these versions.

## Contributing

This project is a monorepo using [Lerna](https://lerna.js.org) to manage its dependencies in concert with [Yarn workspaces](https://yarnpkg.com/features/workspaces). You'll need to make sure to install Yarn and you can optionally install Lerna globally if you need to run any of its commands.

```bash
brew bundle

# optional
yarn global add lerna
```

When using workspaces, running the `lerna boostrap` command is redundant since all it does is call `yarn install` at the root. So you can run the install command yourself once you've got Yarn installed.

```bash
yarn
```

Once everything is installed, use `yarn start` to get Storybook up and running.

```bash
yarn start
```

That's it! Now you can visit http://localhost:1234 to see it in action.

### New Components

If you are contributing a new component, we have provided some templates from which you can generate component boilerplate files using [hygen](https://www.hygen.io/).
We currently have templates for React (TypeScript), Vue, and Freemarker.

#### Generate React component boilerplate

As React is our primary technology, this script will also generate the files required for Lerna to create a package

```bash
yarn generate:react-component <component_name>
```

#### Generate Vue component boilerplate

```bash
yarn generate:vue-component <component_name>
```

#### Generate Freemarker macro boilerplate

```bash
yarn generate:freemarker-macro <component_name>
```

### Releasing

Lerna makes it simple to release all Yarn packages that have changed.

#### Lerna Releases with Gitlab

The pipelines created from a merge into `master` can be manually executed to automatically version, publish, and release all packages that have changed since the previous release.

##### Releasing 1.0.0

During development, packages will be versioned with a `0.x.x` pattern, indicating that the API is unstable. When the package is stable, graduate the package to a `1.0.0` version using the following steps:

1. Ensure all releasable package code is merged into `master`
2. Create a "release MR" that changes the package's `"version"` in its `package.json` to `"1.0.0-release"`
3. Title this MR `chore(PACKAGE_NAME): prep for v1 release`

When this MR is merged into `master` and released via Gitlab, Lerna will use the [`--conventional-graduate`](https://github.com/lerna/lerna/tree/main/libs/commands/version#--conventional-graduate) flag to promote any package with a pre-release version to its stable version, i.e. `1.0.0-release` -> `1.0.0`.

**Note:** This will promote _any_ package with a pre-release version (`x.x.x-something`), so it's important that the "release MR's" only change is updating the version of the package that you intend to promote to a v1.

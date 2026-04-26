---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/tsconfig.json
---

{
  "extends": "../../tsconfig.json",
  "exclude": ["dist"],
  "compilerOptions": {
    "outDir": "dist",
    "declarationDir": "."
  }
}

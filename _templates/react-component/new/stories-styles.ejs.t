---
inject: true
to: .storybook/global.scss
append: true
---

@import "../components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/sass/test";

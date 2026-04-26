---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/sass/_test.scss
---

@import '<%= h.inflection.dasherize( h.changeCase.lower( name ) ) %>';

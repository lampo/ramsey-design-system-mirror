---
to: components/<%= h.inflection.camelize( name ) %>/test/templates/<%= h.inflection.dasherize( name ) %>-test-template.ftl
---

[#include "*/<%= h.inflection.camelize( name, "true" ) %>.ftl"]

[@<%= h.inflection.camelize( name, "true" ) %>
  attributes=attributes
  className=className
  rdsClassSuffix=rdsClassSuffix
]
[/@<%= h.inflection.camelize( name, "true" ) %>]

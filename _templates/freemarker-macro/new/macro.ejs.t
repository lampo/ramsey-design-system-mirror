---
to: components/<%= h.inflection.camelize( name ) %>/<%= h.inflection.camelize( name, true ) %>.ftl
---

[#import "*/common.ftl" as common]

[#macro <%= h.inflection.camelize( name, true ) %>
  attributes={}
  className=""
  rdsClassSuffix=""
]
[/#macro]

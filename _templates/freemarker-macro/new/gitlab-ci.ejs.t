---
inject: true
to: components/<%= h.inflection.camelize( name ) %>/.cicd/.gitlab-ci.yml
append: true
---

test-<%= h.inflection.dasherize( name ) %>-freemarker:
  extends: .test-freemarker-component
  variables:
    COMPONENT: <%= h.inflection.camelize( name ) %>
    COMPONENT_DIR: <%= h.inflection.camelize( name ) %>

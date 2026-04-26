---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/.cicd/.gitlab-ci.yml
---

include: '.cicd/.component.template.gitlab-ci.yml'

test-<%= h.inflection.dasherize( h.changeCase.lower( name ) ) %>-js:
  extends: .test-js-component
  variables:
    COMPONENT: <%= h.inflection.camelize( h.changeCase.lower( name ) ) %>

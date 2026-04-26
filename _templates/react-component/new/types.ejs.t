---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/types/index.ts
---

type <%= h.inflection.camelize( h.changeCase.lower( name ) ) %>Props = {

}

export { <%= h.inflection.camelize( h.changeCase.lower( name ) ) %>Props }

---
to: components/<%= h.inflection.camelize( name ) %>/test/<%= h.inflection.camelize( name ) %>.test.js
---

import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import Rds<%= h.inflection.camelize( name ) %> from "../<%= h.inflection.camelize( name ) %>.vue";

describe("Vue component", () => {
  test("should be rendered", () => {
    const { container } = render(Rds<%= h.inflection.camelize( name ) %>, {
       props: {},
    });

    const element = container.firstChild;
    
    expect(element).toBeInTheDocument();
   
   });
});

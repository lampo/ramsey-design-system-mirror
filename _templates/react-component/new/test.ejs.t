---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/test/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.test.js
---

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import <%= h.inflection.camelize( h.changeCase.lower( name ) ) %> from './../<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>';

describe('React component', () => {
  test('should render', () => {
    const { getByTestId } = render(<<%= h.inflection.camelize( h.changeCase.lower( name ) ) %> data-testid="<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>" />);
    const element = getByTestId('<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>');
    expect(element).toBeInTheDocument();
  });
});

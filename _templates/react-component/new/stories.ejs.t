---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/stories/react/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.stories.jsx
---

import <%= h.inflection.camelize( h.changeCase.lower( name ) ) %> from '../../<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>';
import { kitchenSinkFor } from '../../../../.storybook/config/react/storybook-helpers';

export default {
  title: 'Design System/<%= h.inflection.titleize( h.changeCase.lower( name ) ) %>',
  component: <%= h.inflection.camelize( h.changeCase.lower( name ) ) %>
};

export const Default = {
  args: {

  }
};

export const KitchenSink = {
  render: kitchenSinkFor(),
};

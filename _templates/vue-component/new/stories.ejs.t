---
to: components/<%= h.inflection.camelize( name ) %>/stories/vue/<%= h.inflection.camelize( name ) %>.stories.js
---

import <%= h.inflection.camelize( name ) %> from "../<%= h.inflection.camelize( name ) %>.vue"
import { createStoryRenderer } from "../../../../.storybook/config/vue/storybook-helpers";

import '../sass/_test.scss';

const createRenderFunc = createStoryRenderer({ <%= h.inflection.camelize( name ) %> });

export default {
    title: "Design System/<%= h.inflection.camelize( name ) %>",
    component: <%= h.inflection.camelize( name ) %>,
}

export const Default = {
    args: {},
    render: createRenderFunc('<<%= h.inflection.camelize( name ) %> v-bind="args"/>'),
}

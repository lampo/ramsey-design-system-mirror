---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.tsx
---

import React from 'react';
import classNames from 'classnames';
import { <%= h.inflection.camelize( h.changeCase.lower( name ) ) %>Props } from "./types";

const <%= h.inflection.camelize( h.changeCase.lower( name ) ) %> = ({ ...rest }: <%= h.inflection.camelize( h.changeCase.lower( name ) ) %>Props) => <div {...rest}><%= h.inflection.camelize( h.changeCase.lower( name ) ) %> component</div>;

<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.displayName = '<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>';

export { <%= h.inflection.camelize( h.changeCase.lower( name ) ) %> as default };

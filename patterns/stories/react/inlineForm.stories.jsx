import React from "react";
import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import Select from "@ramsey-design-system/select";
import FormField from "@ramsey-design-system/form-field";
import Input from "@ramsey-design-system/input";
import {
  Section,
  Example,
} from "../../../.storybook/config/react/storybook-helpers";

const INPUT_LENGTHS = ["xs", "sm", "md", "lg", "xl"];

export default {
  title: "Design System/Patterns",
};

export const InlineForm = {
  render: () => (
    <Section title="Inline Form" vertical>
      <Section subsection vertical>
        {INPUT_LENGTHS.map((length) => (
          <Example label={length} key={length}>
            <FormField label="Label">
              {() => (
                <Stack spacing="small">
                  <Input length={length} />
                  <Button>Subscribe</Button>
                </Stack>
              )}
            </FormField>
          </Example>
        ))}
        <Example label="Full Width">
          <FormField label="Label">
            {() => (
              <Stack spacing="small">
                <Input />
                <Button>Subscribe</Button>
              </Stack>
            )}
          </FormField>
        </Example>
      </Section>
      <Section subsection vertical>
        <Example label="Ghost">
          <FormField label="Label">
            {() => (
              <Stack spacing="small">
                <Input length="md" />
                <Button appearance="ghost">Subscribe</Button>
              </Stack>
            )}
          </FormField>
        </Example>
        <Example label="Alternate">
          <FormField label="Label">
            {() => (
              <Stack spacing="small">
                <Input length="md" />
                <Button appearance="alternate">Subscribe</Button>
              </Stack>
            )}
          </FormField>
        </Example>
        <Example label="Select">
          <FormField
            label="Choose your state"
            helper="This is your current state of residence"
          >
            {() => {
              const states = [
                "AK",
                "AZ",
                "AR",
                "CA",
                "CO",
                "CT",
                "DE",
                "FL",
                "GA",
              ];
              return (
                <Stack spacing="small">
                  <Select>
                    {states.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </Select>
                  <Button appearance="alternate">See a Sample Will</Button>
                </Stack>
              );
            }}
          </FormField>
        </Example>
      </Section>
    </Section>
  ),
};

import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import PersonIcon from "./lib/vue-components/PersonIcon.vue";

describe("Vue Icon", () => {
  test("should accept custom width and height", () => {
    const { container } = render(PersonIcon, {
      props: {
        width: 32,
        height: 32,
      },
    });
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  test("should use default dimensions when not specified", () => {
    const { container } = render(PersonIcon);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  test("should render title when provided", () => {
    const { container } = render(PersonIcon, {
      props: {
        title: "Person Icon",
      },
    });

    const title = container.querySelector("title");
    expect(title).toHaveTextContent("Person Icon");
  });

  test("should not render title when not provided", () => {
    const { container } = render(PersonIcon);

    const title = container.querySelector("title");
    expect(title).not.toBeInTheDocument();
  });

  test("should forward additional attributes", () => {
    const { container } = render(PersonIcon, {
      props: {
        fill: "currentColor",
        class: "custom-class",
        "data-testid": "my-icon",
      },
    });
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveClass("custom-class");
    expect(svg).toHaveAttribute("data-testid", "my-icon");
  });
});

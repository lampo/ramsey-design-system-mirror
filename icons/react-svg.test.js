import React, { createRef } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PersonIcon } from "./lib/react-components/PersonIcon";

describe("React Icon", () => {
  test("should accept custom width and height", () => {
    const { container } = render(<PersonIcon width={32} height={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  test("should use default dimensions when not specified", () => {
    const { container } = render(<PersonIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  test("should render title when provided", () => {
    const { container } = render(<PersonIcon title="Person Icon" />);

    const title = container.querySelector("title");
    expect(title).toHaveTextContent("Person Icon");
  });

  test("should not render title when not provided", () => {
    const { container } = render(<PersonIcon />);

    const title = container.querySelector("title");
    expect(title).not.toBeInTheDocument();
  });

  test("should forward additional attributes", () => {
    const { container } = render(
      <PersonIcon
        fill="currentColor"
        className="custom-class"
        data-testid="my-icon"
      />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveClass("custom-class");
    expect(svg).toHaveAttribute("data-testid", "my-icon");
  });

  test("should forward ref to svg element", () => {
    const ref = createRef();
    render(<PersonIcon ref={ref} />);

    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current.tagName).toBe("svg");
  });
});

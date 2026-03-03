import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { JimboTooltip } from "./JimboTooltip";

describe("JimboTooltip", () => {
  it("hidden when visible=false", () => {
    render(
      <JimboTooltip
        completedWords={["Click", "me"]}
        inProgress=""
        visible={false}
      />,
    );
    // The wrapper should not be visible
    const wrapper = document.querySelector("[data-testid='jimbo-tooltip']");
    expect(wrapper).toBeNull();
  });

  it("shows each completed word when visible=true", () => {
    render(
      <JimboTooltip
        completedWords={["Click", "and", "drag"]}
        inProgress=""
        visible={true}
      />,
    );
    expect(screen.getByText("Click")).toBeInTheDocument();
    expect(screen.getByText("and")).toBeInTheDocument();
    expect(screen.getByText("drag")).toBeInTheDocument();
  });

  it("shows inProgress text alongside completed words", () => {
    render(
      <JimboTooltip
        completedWords={["Click"]}
        inProgress="and"
        visible={true}
      />,
    );
    expect(screen.getByText("Click")).toBeInTheDocument();
    expect(screen.getByText("and")).toBeInTheDocument();
  });

  it("renders nothing when not visible", () => {
    const { container } = render(
      <JimboTooltip completedWords={[]} inProgress="" visible={false} />,
    );
    expect(container.firstChild).toBeNull();
  });
});

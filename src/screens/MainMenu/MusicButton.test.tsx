import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MusicButton } from "./MusicButton";

const baseProps = {
  isMusicActive: false,
  showMusicBubble: false,
  handleDismissBubble: vi.fn(),
  onOpen: vi.fn(),
};

describe("MusicButton", () => {
  it("shows MusicOnIcon when isMusicActive=true", () => {
    render(<MusicButton {...baseProps} isMusicActive={true} />);
    expect(screen.getByTestId("music-on-icon")).toBeInTheDocument();
  });

  it("shows MusicOffIcon when isMusicActive=false", () => {
    render(<MusicButton {...baseProps} isMusicActive={false} />);
    expect(screen.getByTestId("music-off-icon")).toBeInTheDocument();
  });

  it("speech bubble hidden when showMusicBubble=false", () => {
    render(<MusicButton {...baseProps} showMusicBubble={false} />);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows 'Browsers block music' variant when isMusicActive=true and showMusicBubble=true", () => {
    render(
      <MusicButton {...baseProps} isMusicActive={true} showMusicBubble={true} />,
    );
    expect(screen.getByText(/Browsers block music/i)).toBeInTheDocument();
  });

  it("shows 'way better with music' variant with dismiss × when music is off and bubble shown", () => {
    render(
      <MusicButton
        {...baseProps}
        isMusicActive={false}
        showMusicBubble={true}
      />,
    );
    expect(screen.getByText(/way/i)).toBeInTheDocument();
    expect(screen.getByText("×")).toBeInTheDocument();
  });

  it("clicking × calls handleDismissBubble", async () => {
    const handleDismissBubble = vi.fn();
    render(
      <MusicButton
        {...baseProps}
        isMusicActive={false}
        showMusicBubble={true}
        handleDismissBubble={handleDismissBubble}
      />,
    );
    await userEvent.click(screen.getByText("×"));
    expect(handleDismissBubble).toHaveBeenCalledOnce();
  });

  it("onOpen called when the icon button is clicked", async () => {
    const onOpen = vi.fn();
    render(<MusicButton {...baseProps} onOpen={onOpen} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onOpen).toHaveBeenCalledOnce();
  });
});

import { type FC } from "react";
import {
  MusicOffIcon,
  MusicOnIcon,
  SocialIconButton,
} from "./SocialIcons";
import {
  MusicButtonWrapper,
  MusicSpeechBubble,
  MusicBubbleArrow,
  MusicBubbleBox,
  MusicBubbleDismiss,
} from "./MainMenuStyles";

type Props = {
  isMusicActive: boolean;
  showMusicBubble: boolean;
  handleDismissBubble: (e: React.MouseEvent) => void;
  onOpen: () => void;
};

export const MusicButton: FC<Props> = ({
  isMusicActive,
  showMusicBubble,
  handleDismissBubble,
  onOpen,
}) => (
  <MusicButtonWrapper>
    <SocialIconButton
      as="button"
      $bgColor={isMusicActive ? "#27ae60" : "#c0392b"}
      onClick={onOpen}
    >
      {isMusicActive ? (
        <span data-testid="music-on-icon">
          <MusicOnIcon />
        </span>
      ) : (
        <span data-testid="music-off-icon">
          <MusicOffIcon />
        </span>
      )}
    </SocialIconButton>
    {showMusicBubble &&
      (isMusicActive ? (
        <MusicSpeechBubble>
          <MusicBubbleBox>
            Browsers block music — click the button to enable it
          </MusicBubbleBox>
          <MusicBubbleArrow />
        </MusicSpeechBubble>
      ) : (
        <MusicSpeechBubble>
          <MusicBubbleBox>
            this site is{" "}
            <strong
              style={{
                color: "red",
                fontWeight: 500,
                fontSize: "1.8rem",
              }}
            >
              way
            </strong>{" "}
            better with music I promise
            <MusicBubbleDismiss onClick={handleDismissBubble}>
              ×
            </MusicBubbleDismiss>
          </MusicBubbleBox>
          <MusicBubbleArrow />
        </MusicSpeechBubble>
      ))}
  </MusicButtonWrapper>
);

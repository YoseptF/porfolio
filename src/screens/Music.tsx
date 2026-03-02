import { type FC } from "react";
import styled from "styled-components";
import { BalatroButton } from "../components/ui/BalatroButton";
import { BalatroPanel } from "../components/ui/BalatroPanel";
import { BalatroText } from "../components/ui/BalatroText";
import { ModalWrapper } from "../components/ui/ModalWrapper";
import { useAppDispatch } from "../store/hooks";
import { closeModal } from "../store/slices/navigation";
import { isMusicEnabled, audioPlayer } from "../services/audioPlayer";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  text-align: center;
`;

export const Music: FC = () => {
  const dispatch = useAppDispatch();
  const active = isMusicEnabled();
  const blocked = active && !audioPlayer.isPlaying();

  const handleReplayIntro = () => {
    localStorage.setItem("replayIntro", "true");
    window.location.reload();
  };

  const handlePrimary = () => {
    if (active && !blocked) {
      localStorage.removeItem("musicEnabled");
    } else if (!active) {
      localStorage.setItem("musicEnabled", "true");
    }
    window.location.reload();
  };

  const bodyText = active && !blocked
    ? "Turn off the music?"
    : blocked
      ? "Browser blocked the music — click to enable it now"
      : "The page will start playing music";

  const primaryColor = active && !blocked ? "red" : "green";
  const primaryLabel = active && !blocked ? "Turn off" : "Let\u2019s go!";

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
      <BalatroPanel title="MUSIC">
        <Content>
          <BalatroText variant="body">{bodyText}</BalatroText>
          <BalatroButton color={primaryColor} onClick={handlePrimary}>
            {primaryLabel}
          </BalatroButton>
          <BalatroButton color="blue" onClick={handleReplayIntro}>
            Replay intro
          </BalatroButton>
        </Content>
      </BalatroPanel>
    </ModalWrapper>
  );
};

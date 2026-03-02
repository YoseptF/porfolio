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
  gap: 24px;
  padding: 8px 0;
  text-align: center;
`;

export const Music: FC = () => {
  const dispatch = useAppDispatch();
  const active = isMusicEnabled();
  // Music is enabled in localStorage but audio was blocked by the browser
  const blocked = active && !audioPlayer.isPlaying();

  const handleConfirm = () => {
    if (active && !blocked) {
      localStorage.removeItem("musicEnabled");
      window.location.reload();
    } else if (blocked) {
      window.location.reload();
    } else {
      localStorage.setItem("musicEnabled", "true");
      window.location.reload();
    }
  };

  const buttonColor = active && !blocked ? "red" : "green";
  const buttonLabel = active && !blocked ? "Turn off" : "Let\u2019s go!";
  const bodyText = active && !blocked
    ? "Turn off the music?"
    : blocked
      ? "Browser blocked the music — click to enable it now"
      : "The page will start playing music";

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
      <BalatroPanel title="MUSIC">
        <Content>
          <BalatroText variant="body">{bodyText}</BalatroText>
          <BalatroButton color={buttonColor} onClick={handleConfirm}>
            {buttonLabel}
          </BalatroButton>
        </Content>
      </BalatroPanel>
    </ModalWrapper>
  );
};

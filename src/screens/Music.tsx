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

const restartIntro = () => {
  window.dispatchEvent(new CustomEvent("portfolio:restart-intro"));
};

const restartMainMenu = () => {
  window.dispatchEvent(new CustomEvent("portfolio:restart-main-menu"));
};

export const Music: FC = () => {
  const dispatch = useAppDispatch();
  const active = isMusicEnabled();
  const blocked = active && !audioPlayer.isPlaying();

  const handleEnableWithIntro = () => {
    localStorage.setItem("musicEnabled", "true");
    localStorage.setItem("replayIntro", "true");
    audioPlayer.unlock();
    dispatch(closeModal());
    restartIntro();
  };

  const handleDisable = () => {
    localStorage.removeItem("musicEnabled");
    window.location.reload();
  };

  const handleReplayIntro = () => {
    localStorage.setItem("replayIntro", "true");
    audioPlayer.unlock();
    dispatch(closeModal());
    restartIntro();
  };

  if (!active) {
    return (
      <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
        <BalatroPanel title="MUSIC">
          <Content>
            <BalatroText variant="body">The page will start playing music</BalatroText>
            <BalatroButton color="green" onClick={handleEnableWithIntro}>
              Let&apos;s go!
            </BalatroButton>
          </Content>
        </BalatroPanel>
      </ModalWrapper>
    );
  }

  const handleBlockedLetsGo = () => {
    audioPlayer.start();
    dispatch(closeModal());
    restartMainMenu();
  };

  if (blocked) {
    return (
      <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
        <BalatroPanel title="MUSIC">
          <Content>
            <BalatroText variant="body">Browser blocked the music — click to enable it now</BalatroText>
            <BalatroButton color="green" onClick={handleBlockedLetsGo}>
              Let&apos;s go!
            </BalatroButton>
            <BalatroButton color="blue" onClick={handleReplayIntro}>
              Replay intro
            </BalatroButton>
            <BalatroButton color="red" onClick={handleDisable}>
              Turn off
            </BalatroButton>
          </Content>
        </BalatroPanel>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
      <BalatroPanel title="MUSIC">
        <Content>
          <BalatroText variant="body">Turn off the music?</BalatroText>
          <BalatroButton color="red" onClick={handleDisable}>
            Turn off
          </BalatroButton>
          <BalatroButton color="blue" onClick={handleReplayIntro}>
            Replay intro
          </BalatroButton>
        </Content>
      </BalatroPanel>
    </ModalWrapper>
  );
};

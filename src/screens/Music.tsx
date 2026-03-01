import { type FC } from "react";
import styled from "styled-components";
import { BalatroButton } from "../components/ui/BalatroButton";
import { BalatroPanel } from "../components/ui/BalatroPanel";
import { BalatroText } from "../components/ui/BalatroText";
import { ModalWrapper } from "../components/ui/ModalWrapper";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal, selectMusicEnabled, setMusicEnabled } from "../store/slices/navigation";

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
  const active = useAppSelector(selectMusicEnabled);

  const handleConfirm = () => {
    if (active) {
      localStorage.removeItem("musicEnabled");
    } else {
      localStorage.setItem("musicEnabled", "true");
    }
    dispatch(setMusicEnabled(!active));
    dispatch(closeModal());
  };

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="380px" fitContent>
      <BalatroPanel title="MUSIC">
        <Content>
          <BalatroText variant="body">
            {active ? "Turn off the music?" : "The page will start playing music"}
          </BalatroText>
          <BalatroButton color={active ? "red" : "green"} onClick={handleConfirm}>
            {active ? "Turn off" : "Let\u2019s go!"}
          </BalatroButton>
        </Content>
      </BalatroPanel>
    </ModalWrapper>
  );
};

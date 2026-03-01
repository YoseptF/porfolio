import { type FC } from "react";
import styled from "styled-components";
import { BalatroButton } from "../components/ui/BalatroButton";
import { ModalWrapper } from "../components/ui/ModalWrapper";
import { useAppDispatch } from "../store/hooks";
import { closeModal } from "../store/slices/navigation";
import { theme } from "../styles/theme";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 20px;
  text-align: center;
`;

const Message = styled.p`
  font-family: ${theme.font.family};
  font-size: 1.4rem;
  color: ${theme.colors.text.white};
  line-height: 1.6;
`;

export const Music: FC = () => {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    localStorage.setItem("playMusic", "true");
    window.location.reload();
  };

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="400px">
      <Content>
        <Message>The page will reload with music</Message>
        <BalatroButton color="green" onClick={handleConfirm}>
          Let&apos;s go!
        </BalatroButton>
      </Content>
    </ModalWrapper>
  );
};

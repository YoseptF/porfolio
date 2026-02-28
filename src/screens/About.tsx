import { type FC } from "react";
import styled from "styled-components";
import { BalatroText } from "../components/ui/BalatroText";
import { BalatroPanel } from "../components/ui/BalatroPanel";
import { ModalWrapper } from "../components/ui/ModalWrapper";
import { useAppDispatch } from "../store/hooks";
import { closeModal } from "../store/slices/navigation";
import { theme } from "../styles/theme";

const TallPanel = styled(BalatroPanel)`
  min-height: 65vh;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid ${theme.colors.panel.border};
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  line-height: 1.7;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: auto;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

export const About: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="70vw">
      <TallPanel title="ABOUT">
        <ProfileSection>
          <ProfileImage src="/cards/happy.png" alt="Joseph" />
          <div>
            <BalatroText variant="heading">Joseph Flores</BalatroText>
            <br />
            <BalatroText variant="gold">Frontend Developer</BalatroText>
          </div>
        </ProfileSection>

        <Bio>
          <BalatroText variant="body">
            I've been building awesome frontend experiences with JavaScript and
            React for 8+ years. It's my passion!
          </BalatroText>
          <BalatroText variant="body">
            My background in digital art and philosophy helps me approach coding
            with a different perspective.
          </BalatroText>
          <BalatroText variant="body">
            Outside of my day job, I started and ran a successful freelance
            group. Client communication and real-world problem-solving? I'm on
            it.
          </BalatroText>
          <BalatroText variant="body">
            My goal is simple: create digital solutions that are beautiful,
            intuitive, and work perfectly.
          </BalatroText>
        </Bio>

        <StatsRow>
          <StatItem>
            <BalatroText variant="chips">6+</BalatroText>
            <br />
            <BalatroText variant="body">Years</BalatroText>
          </StatItem>
          <StatItem>
            <BalatroText variant="mult">∞</BalatroText>
            <br />
            <BalatroText variant="body">Logo revisions</BalatroText>
          </StatItem>
          <StatItem>
            <BalatroText variant="gold">100%</BalatroText>
            <br />
            <BalatroText variant="body">Delivered</BalatroText>
          </StatItem>
        </StatsRow>
      </TallPanel>
    </ModalWrapper>
  );
};

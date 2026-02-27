import { type FC } from 'react'
import styled from 'styled-components'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroPanel } from '../components/ui/BalatroPanel'
import { ModalWrapper } from '../components/ui/ModalWrapper'
import { useAppDispatch } from '../store/hooks'
import { closeModal } from '../store/slices/navigation'
import { theme } from '../styles/theme'

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid ${theme.colors.panel.border};
`

const Bio = styled.div`
  margin-bottom: 16px;
  line-height: 1.6;
`

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
  }
`

const StatItem = styled.div`
  text-align: center;
`

export const About: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())}>
      <BalatroPanel title="ABOUT">
        <ProfileSection>
          <ProfileImage src="/cards/happy.png" alt="Joseph" />
          <div>
            <BalatroText variant="heading">Joseph Flores</BalatroText>
            <br />
            <BalatroText variant="gold">Software Developer</BalatroText>
          </div>
        </ProfileSection>

        <Bio>
          <BalatroText variant="body">
            5+ years of experience building web applications with JavaScript, React,
            and modern frameworks. Passionate about 3D graphics, game development,
            and creating unique interactive experiences.
          </BalatroText>
        </Bio>

        <StatsRow>
          <StatItem>
            <BalatroText variant="chips">5+</BalatroText>
            <br />
            <BalatroText variant="body">Years</BalatroText>
          </StatItem>
          <StatItem>
            <BalatroText variant="mult">6+</BalatroText>
            <br />
            <BalatroText variant="body">Projects</BalatroText>
          </StatItem>
          <StatItem>
            <BalatroText variant="gold">∞</BalatroText>
            <br />
            <BalatroText variant="body">Curiosity</BalatroText>
          </StatItem>
        </StatsRow>
      </BalatroPanel>
    </ModalWrapper>
  )
}

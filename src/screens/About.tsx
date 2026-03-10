import { type FC } from 'react'
import styled from 'styled-components'
import { Text } from '../components/ui/Text'
import { Panel } from '../components/ui/Panel'
import { ModalWrapper } from '../components/ui/ModalWrapper'
import { useAppDispatch } from '../store/hooks'
import { closeModal } from '../store/slices/navigation'
import { theme } from '../styles/theme'
import { EXPERIENCE } from '../constants'

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

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

  @media (max-width: 600px) {
    width: 56px;
    height: 56px;
  }
`

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  line-height: 1.7;

  @media (max-width: 600px) {
    gap: 8px;
    margin-bottom: 12px;
    & > *:nth-child(n+3) {
      display: none;
    }
  }
`

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: auto;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
    gap: 8px;
  }
`

const StatItem = styled.div`
  text-align: center;
`

export const About: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <ModalWrapper onBack={() => dispatch(closeModal())} maxWidth="min(900px, 92vw)">
      <Panel title="ABOUT">
        <ProfileSection>
          <ProfileImage src="/cards/happy.png" alt="Joseph" />
          <div>
            <Text variant="heading">Joseph Flores</Text>
            <br />
            <Text variant="gold">Frontend Developer</Text>
          </div>
        </ProfileSection>

        <Bio>
          <Text variant="body">
            I&apos;ve spent the last {EXPERIENCE} years translating complex ideas
            into seamless React interfaces. Programming is much more than
            writing code, it&apos;s a medium for expression.
          </Text>
          <Text variant="body">
            My dual background in digital arts and computer science means I
            don&apos;t just ask how to build something, but why it matters to the
            person on the other side of the screen.
          </Text>
          <Text variant="body">
            Whether leading frontend teams or art collectives, I&apos;ve learned that
            the best products aren&apos;t built in a vacuum. They&apos;re the result of
            clear communication and a deep focus on solving real human problems.
          </Text>
          <Text variant="body">
            My goal is simple: create digital solutions that are technically
            sound, visually compelling, and work perfectly.
          </Text>
        </Bio>

        <StatsRow>
          <StatItem>
            <Text variant="chips">{EXPERIENCE}</Text>
            <br />
            <Text variant="body">Years</Text>
          </StatItem>
          <StatItem>
            <Text variant="mult">∞</Text>
            <br />
            <Text variant="body">Logo revisions</Text>
          </StatItem>
          <StatItem>
            <Text variant="gold">100%</Text>
            <br />
            <Text variant="body">Delivered</Text>
          </StatItem>
        </StatsRow>
      </Panel>
    </ModalWrapper>
  )
}

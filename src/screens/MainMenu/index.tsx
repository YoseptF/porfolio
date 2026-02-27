import { type FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../../components/three/BalatroBackground'
import { useAppDispatch } from '../../store/hooks'
import { navigateTo, openModal } from '../../store/slices/navigation'
import { useCardDrag } from './useCardDrag'
import { GitHubIcon, LinkedInIcon, SocialIconButton } from './SocialIcons'
import {
  Wrapper, TitleCardArea, TitleCardWrapper, TitleLogo, CardImage,
  VersionText, BottomArea, ProfileContainer, ProfileLabel, ProfileValue,
  ButtonsContainer, PlayButton, MenuButton,
} from './MainMenuStyles'

const personalCards = ['happy', 'cool', 'coffe', 'shocked', 'te', 'workout', 'call']
const cardTexture = personalCards[Math.floor(Math.random() * personalCards.length)] ?? personalCards[0]

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch()
  const { cardRef, onPointerDown, onPointerMove, onPointerUp } = useCardDrag()

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground />
      </Canvas>

      <VersionText>
        v1.0-FULL
        <br />
        PORTFOLIO
      </VersionText>

      <TitleCardArea>
        <TitleCardWrapper>
          <TitleLogo src="/title.png" alt="JOSEPH" />
          <CardImage
            ref={cardRef}
            src={`/cards/${cardTexture}.png`}
            alt="Personal card"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            draggable={false}
          />
        </TitleCardWrapper>
      </TitleCardArea>

      <BottomArea>
        <ProfileContainer>
          <ProfileLabel>Profile</ProfileLabel>
          <ProfileValue>Joseph</ProfileValue>
        </ProfileContainer>

        <ButtonsContainer>
          <PlayButton color="blue" onClick={() => dispatch(navigateTo('projects'))}>
            Play
          </PlayButton>
          <MenuButton color="orange" onClick={() => dispatch(openModal('about'))}>
            About
          </MenuButton>
          <MenuButton color="red" onClick={() => dispatch(openModal('contact'))}>
            Contact
          </MenuButton>
          <MenuButton color="green" onClick={() => dispatch(openModal('skills'))}>
            Skills
          </MenuButton>
          <MenuButton color="purple" onClick={() => window.open('https://github.com/YoseptF', '_blank')}>
            Resume
          </MenuButton>
        </ButtonsContainer>

        <SocialIconButton
          $bgColor="#1a1a1a"
          href="https://github.com/YoseptF"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </SocialIconButton>
        <SocialIconButton
          $bgColor="#0077B5"
          href="https://www.linkedin.com/in/joseph-flores-vega/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </SocialIconButton>
      </BottomArea>
    </Wrapper>
  )
}

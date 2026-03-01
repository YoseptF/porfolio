import { type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { BalatroBackground } from "../../components/three/BalatroBackground";
import { useAppDispatch } from "../../store/hooks";
import { navigateTo, openModal } from "../../store/slices/navigation";
import { useCardDrag } from "./useCardDrag";
import {
  GitHubIcon,
  LinkedInIcon,
  ResumeIcon,
  SocialIconButton,
} from "./SocialIcons";
import {
  Wrapper,
  TitleCardArea,
  TitleCardWrapper,
  TitleLogo,
  CardImage,
  VersionText,
  BottomArea,
  ProfileContainer,
  ProfileLabel,
  ButtonsContainer,
  PlayButton,
  MenuButton,
  SocialsRow,
  JimboTooltipWrapper,
  JimboTooltipArrow,
  JimboTooltipBubble,
  JimboTooltipText,
} from "./MainMenuStyles";

const isTouch = window.matchMedia("(pointer: coarse)").matches;
import { BalatroButton } from "../../components/ui/BalatroButton";

const personalCards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const cardTexture =
  personalCards[Math.floor(Math.random() * personalCards.length)] ??
  personalCards[0];

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { cardRef, onPointerDown, onPointerMove, onPointerUp, tooltipVisible } = useCardDrag();

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: "absolute", inset: 0 }}
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
            src={`/jokers/${cardTexture}.png`}
            alt="Personal card"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            draggable={false}
          />
          <JimboTooltipWrapper $visible={tooltipVisible}>
            <JimboTooltipArrow />
            <JimboTooltipBubble>
              <JimboTooltipText>
                {isTouch
                  ? "Drag me around with your finger. I dare ya."
                  : "Drag me around with your mouse. I dare ya."}
              </JimboTooltipText>
            </JimboTooltipBubble>
          </JimboTooltipWrapper>
        </TitleCardWrapper>
      </TitleCardArea>

      <BottomArea>
        <ProfileContainer>
          <ProfileLabel>Profile</ProfileLabel>
          <BalatroButton color="grey" href="/docs/josephFloresATS.pdf" target="_blank" rel="noopener noreferrer">Joseph</BalatroButton>
        </ProfileContainer>

        <ButtonsContainer>
          <PlayButton
            color="blue"
            onClick={() => dispatch(navigateTo("projects"))}
          >
            Play
          </PlayButton>
          <MenuButton
            color="orange"
            onClick={() => dispatch(openModal("about"))}
          >
            About
          </MenuButton>
          <MenuButton
            color="red"
            onClick={() => dispatch(openModal("contact"))}
          >
            Contact
          </MenuButton>
          <MenuButton
            color="green"
            onClick={() => dispatch(openModal("skills"))}
          >
            Skills
          </MenuButton>
        </ButtonsContainer>

        <SocialsRow>
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
          <SocialIconButton
            $bgColor="#7D3C98"
            href="/docs/josephFloresATS.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ResumeIcon />
          </SocialIconButton>
        </SocialsRow>
      </BottomArea>
    </Wrapper>
  );
};

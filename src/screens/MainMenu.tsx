import { type FC, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { BalatroBackground } from "../components/three/BalatroBackground";
import {
  BalatroButton,
  BalatroButtonInner,
} from "../components/ui/BalatroButton";
import { useAppDispatch } from "../store/hooks";
import { navigateTo, openModal } from "../store/slices/navigation";
import { theme, pixelatedClipPath } from "../styles/theme";

const personalCards = [
  "happy",
  "cool",
  "coffe",
  "shocked",
  "te",
  "workout",
  "call",
];

const randomCard = () => {
  const idx = Math.floor(Math.random() * personalCards.length);
  return personalCards[idx] ?? personalCards[0];
};

const cardTexture = randomCard();

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`;

const TitleCardArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

const TitleCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleLogo = styled.img`
  width: 75vw;
  max-width: 1100px;
  height: auto;

  @media (max-width: 600px) {
    width: 90vw;
  }
`;

const CardImage = styled.img`
  position: absolute;
  width: 17vw;
  min-width: 150px;
  max-width: 240px;
  height: auto;
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
  pointer-events: auto;
  z-index: 2;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 600px) {
    width: 28vw;
    min-width: 100px;
  }
`;

const VersionText = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  text-align: right;
  line-height: 1.4;
  letter-spacing: 1px;
  pointer-events: none;
  z-index: 3;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
`;

const panelStyle = `
  position: relative;
  isolation: isolate;
  filter: drop-shadow(0 5px 0 rgba(0, 0, 0, 0.6));
  transition: filter 0.1s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #494951;
    ${pixelatedClipPath(6)}
    z-index: -1;
  }
`;

const BottomArea = styled.div`
  position: absolute;
  bottom: 30px;
  left: 10px;
  right: 10px;
  height: 15vh;
  min-height: 120px;
  display: flex;
  align-items: stretch;
  gap: 8px;
  pointer-events: auto;
  z-index: 2;
`;

const ProfileContainer = styled.div`
  ${panelStyle}
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 14px;
  flex-shrink: 0;
  gap: 4px;
`;

const ProfileLabel = styled.span`
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: ${theme.colors.text.muted};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProfileValue = styled.span`
  font-family: ${theme.font.family};
  font-size: 1.1rem;
  color: ${theme.colors.text.gold};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-top: 2px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 6px 12px 6px;
  flex: 1;
  position: relative;
  isolation: isolate;
  filter: drop-shadow(0 5px 0 rgba(0, 0, 0, 0.6));
  transition: filter 0.1s;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #494951;
    ${pixelatedClipPath(6)}
    z-index: -1;
  }
`;

const PlayButton = styled(BalatroButton)`
  flex: 1.5;
  align-self: stretch;
  filter: drop-shadow(0 7px 0 rgba(0, 0, 0, 0.6));

  &:hover {
    filter: brightness(1.15) drop-shadow(0 6px 0 rgba(0, 0, 0, 0.4));
  }

  &:active {
    filter: drop-shadow(0 3px 0 rgba(0, 0, 0, 0.4));
  }

  ${BalatroButtonInner} {
    font-size: 3.3rem;
    white-space: nowrap;
    padding: 0 10px;
  }
`;

const MenuButton = styled(BalatroButton)`
  flex: 1;
  height: calc(15vh * 0.62 - 12px);
  min-height: 92px;

  ${BalatroButtonInner} {
    font-size: 2.4rem;
    white-space: nowrap;
    padding: 0 10px;
  }
`;

const SocialIconButton = styled.a<{ $bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  background: ${({ $bgColor }) => $bgColor};
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  filter: drop-shadow(-4px 4px 0 rgba(0, 0, 0, 0.6));
  transition:
    filter 0.1s,
    transform 0.1s;

  svg {
    width: 22px;
    height: 22px;
    fill: white;
  }

  &:hover {
    filter: brightness(1.25) drop-shadow(-3px 3px 0 rgba(0, 0, 0, 0.4));
    transform: translateY(-2px);
  }

  &:active {
    filter: drop-shadow(-2px 2px 0 rgba(0, 0, 0, 0.4));
    transform: translateY(2px);
  }
`;

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLImageElement>(null);
  const animFrame = useRef(0);
  const startTime = useRef(0);
  const dragState = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    startTime.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const jiggleAngle = Math.sin(elapsed * 3) * 4;
      const bobY = Math.sin(elapsed * 2) * 6;
      const { x, y } = dragState.current;

      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${x}px, ${y + bobY}px) rotate(${jiggleAngle}deg)`;
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  const handleCardPointerDown = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      e.preventDefault();
      const card = cardRef.current;
      if (!card) return;

      card.setPointerCapture(e.pointerId);
      const rect = card.getBoundingClientRect();
      dragState.current.dragging = true;
      dragState.current.offsetX =
        e.clientX - rect.left - rect.width / 2 - dragState.current.x;
      dragState.current.offsetY =
        e.clientY - rect.top - rect.height / 2 - dragState.current.y;
    },
    [],
  );

  const handleCardPointerMove = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      if (!dragState.current.dragging || !cardRef.current) return;

      const rect = cardRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      dragState.current.x = e.clientX - centerX - dragState.current.offsetX;
      dragState.current.y = e.clientY - centerY - dragState.current.offsetY;
    },
    [],
  );

  const handleCardPointerUp = useCallback(() => {
    dragState.current.dragging = false;
  }, []);

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
            src={`/cards/${cardTexture}.png`}
            alt="Personal card"
            onPointerDown={handleCardPointerDown}
            onPointerMove={handleCardPointerMove}
            onPointerUp={handleCardPointerUp}
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
          <MenuButton
            color="purple"
            onClick={() => window.open("https://github.com/YoseptF", "_blank")}
          >
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
  );
};

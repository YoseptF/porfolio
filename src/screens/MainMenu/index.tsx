import { type FC, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { BalatroBackground } from "../../components/three/BalatroBackground";
import { useAppDispatch } from "../../store/hooks";
import { openModal } from "../../store/slices/navigation";
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
  CardImage,
  TitleLogo,
  VersionText,
  BottomArea,
  ProfileContainer,
  ProfileLabel,
  ButtonsContainer,
  PlayButton,
  MenuButton,
  SocialsRow,
} from "./MainMenuStyles";
import { BalatroButton } from "../../components/ui/BalatroButton";
import { isMusicEnabled, audioPlayer } from "../../services/audioPlayer";
import { BurnRevealFilter } from "./BurnReveal";
import { IntroSequence } from "./IntroSequence";
import { DebugSwirl } from "./DebugSwirl";
import { slowFilters } from "../../utils/browserCaps";
import { TAUNT_CYCLE_MS } from "../../constants";
import { useTypewriter } from "./useTypewriter";
import { useTauntCycle } from "./useTauntCycle";
import { useMusicBubble } from "./useMusicBubble";
import { JimboTooltip } from "./JimboTooltip";
import { MusicButton } from "./MusicButton";

const personalCards = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const cardTexture =
  personalCards[Math.floor(Math.random() * personalCards.length)] ?? "1";

const VOICE_COUNT = 11;

const playVoice = () => {
  const n = Math.floor(Math.random() * VOICE_COUNT) + 1;
  new Audio(`/voice/voice${n}.mp3`).play().catch(() => {});
};

const MAX_DPR = slowFilters ? 1.5 : 2;

const isDebugSwirl = new URLSearchParams(window.location.search).has(
  "debugSwirl",
);

export const shouldPlayIntro = () =>
  !localStorage.getItem("introPlayed") ||
  localStorage.getItem("replayIntro") === "true";

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { cardRef, onPointerDown, onPointerMove, onPointerUp, hasDragged } =
    useCardDrag();

  const [introActive, setIntroActive] = useState(() => shouldPlayIntro());
  const [burnInActive, setBurnInActive] = useState(() => !shouldPlayIntro());
  const [cardBurnDone, setCardBurnDone] = useState(false);

  const {
    isMusicActive,
    setIsMusicActive,
    setShowAudioBlockedBubble,
    showMusicBubble,
    handleDismissBubble,
  } = useMusicBubble(introActive);

  const { tauntSeed, tooltipText, nextTaunt } = useTauntCycle();

  const { completedWords, inProgress } = useTypewriter(
    tooltipText,
    cardBurnDone,
    tauntSeed,
  );

  const isTypingDone =
    completedWords.length > 0 &&
    inProgress === "" &&
    completedWords.join(" ") === tooltipText;

  useEffect(() => {
    if (!isTypingDone || hasDragged || !cardBurnDone) return;
    const id = setTimeout(nextTaunt, TAUNT_CYCLE_MS);
    return () => clearTimeout(id);
  }, [isTypingDone, hasDragged, cardBurnDone, nextTaunt]);

  useEffect(() => {
    const handler = () => {
      setIsMusicActive(isMusicEnabled());
      setIntroActive(true);
      setBurnInActive(false);
      setShowAudioBlockedBubble(false);
      setCardBurnDone(false);
    };
    window.addEventListener("portfolio:restart-intro", handler);
    return () => window.removeEventListener("portfolio:restart-intro", handler);
  }, [setIsMusicActive, setShowAudioBlockedBubble]);

  useEffect(() => {
    const handler = () => {
      setCardBurnDone(false);
      setShowAudioBlockedBubble(false);
      setBurnInActive(false);
      setTimeout(() => setBurnInActive(true), 50);
    };
    window.addEventListener("portfolio:restart-main-menu", handler);
    return () => window.removeEventListener("portfolio:restart-main-menu", handler);
  }, [setShowAudioBlockedBubble]);

  const prevCharCount = useRef(0);
  useEffect(() => {
    const count =
      completedWords.reduce((sum, w) => sum + w.length, 0) + inProgress.length;
    if (
      isMusicActive &&
      audioPlayer.isPlaying() &&
      count > prevCharCount.current
    ) {
      playVoice();
    }
    prevCharCount.current = count;
  }, [completedWords, inProgress, isMusicActive]);

  if (isDebugSwirl) return <DebugSwirl />;

  return (
    <Wrapper>
      {introActive && (
        <IntroSequence
          cardTexture={cardTexture}
          onRevealStart={() => {}}
          onComplete={() => {
            setIntroActive(false);
            localStorage.setItem("introPlayed", "true");
            localStorage.removeItem("replayIntro");
            if (isMusicEnabled()) audioPlayer.start();
            setTimeout(() => setBurnInActive(true), 1500);
          }}
        />
      )}

      <BurnRevealFilter
        active={burnInActive}
        onCardComplete={() => setCardBurnDone(true)}
      />
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, MAX_DPR]}
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
        <TitleCardWrapper style={{ opacity: burnInActive ? 1 : 0 }}>
          <TitleLogo src="/title.png" alt="JOSEPH" />
          <CardImage
            ref={cardRef}
            src={`/jokers/${cardTexture}.png`}
            $src={`/jokers/${cardTexture}.png`}
            alt="Personal card"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            draggable={false}
          />
          <JimboTooltip
            completedWords={completedWords}
            inProgress={inProgress}
            visible={cardBurnDone && !hasDragged}
          />
        </TitleCardWrapper>
      </TitleCardArea>

      <BottomArea>
        <ProfileContainer>
          <ProfileLabel>Profile</ProfileLabel>
          <BalatroButton
            color="grey"
            href="/docs/josephFloresATS.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joseph
          </BalatroButton>
        </ProfileContainer>

        <ButtonsContainer>
          <PlayButton color="blue" onClick={() => dispatch(openModal("play"))}>
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
            onClick={() => dispatch(openModal("theme"))}
          >
            Style
          </MenuButton>
        </ButtonsContainer>

        <SocialsRow>
          <MusicButton
            isMusicActive={isMusicActive}
            showMusicBubble={showMusicBubble}
            handleDismissBubble={handleDismissBubble}
            onOpen={() => dispatch(openModal("music"))}
          />
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

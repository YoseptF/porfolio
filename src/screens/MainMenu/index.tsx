import { type FC, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { BalatroBackground } from "../../components/three/BalatroBackground";
import { useAppDispatch } from "../../store/hooks";
import { openModal } from "../../store/slices/navigation";
import { useCardDrag } from "./useCardDrag";
import {
  GitHubIcon,
  LinkedInIcon,
  MusicOffIcon,
  MusicOnIcon,
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
  TooltipWord,
  MusicButtonWrapper,
  MusicSpeechBubble,
  MusicBubbleArrow,
  MusicBubbleBox,
  MusicBubbleDismiss,
} from "./MainMenuStyles";
import { DRAG_TAUNTS, BURN_IN_AFTER_INTRO_DELAY_MS } from "../../constants";
import { BalatroButton } from "../../components/ui/BalatroButton";
import { isMusicEnabled, audioPlayer } from "../../services/audioPlayer";
import { BurnRevealFilter } from "./BurnReveal";
import { IntroSequence } from "./IntroSequence";
import { DebugSwirl } from "./DebugSwirl";

const isTouch = window.matchMedia("(pointer: coarse)").matches;
const DEFAULT_TAUNT = {
  touch: "Hold and drag the card",
  mouse: "Click and drag the card",
};
const taunt =
  DRAG_TAUNTS[Math.floor(Math.random() * DRAG_TAUNTS.length)] ?? DEFAULT_TAUNT;

const personalCards = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const cardTexture =
  personalCards[Math.floor(Math.random() * personalCards.length)] ?? "1";

const VOICE_COUNT = 11;
const isMusicActive = isMusicEnabled();

const playVoice = () => {
  const n = Math.floor(Math.random() * VOICE_COUNT) + 1;
  new Audio(`/voice/voice${n}.mp3`).play().catch(() => {});
};

type TypewriterState = { completedWords: string[]; inProgress: string };

const buildTypewriterFrames = (text: string) => {
  const frames: { state: TypewriterState; delay: number }[] = [];
  const done: string[] = [];
  let word = "";
  let elapsed = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i] ?? "";
    const isSpace = char === " ";
    const isLast = i === text.length - 1;

    elapsed += 65;

    if (isSpace) {
      done.push(word);
      word = "";
      frames.push({
        state: { completedWords: [...done], inProgress: "" },
        delay: elapsed,
      });
    } else {
      word += char;
      if (isLast) {
        done.push(word);
        frames.push({
          state: { completedWords: [...done], inProgress: "" },
          delay: elapsed,
        });
      } else {
        frames.push({
          state: { completedWords: [...done], inProgress: word },
          delay: elapsed,
        });
      }
    }
  }

  return frames;
};

const useTypewriter = (text: string, active: boolean, seed: number) => {
  const [state, setState] = useState<TypewriterState>({
    completedWords: [],
    inProgress: "",
  });

  useEffect(() => {
    if (!active) {
      setState({ completedWords: [], inProgress: "" });
      return;
    }
    setState({ completedWords: [], inProgress: "" });
    const frames = buildTypewriterFrames(text);
    const ids = frames.map(({ state: s, delay }) =>
      setTimeout(() => setState(s), delay),
    );
    return () => ids.forEach(clearTimeout);
  }, [active, text, seed]);

  return state;
};

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
  const tooltipText = isTouch ? taunt.touch : taunt.mouse;

  const [introActive, setIntroActive] = useState(() => shouldPlayIntro());
  const [burnInActive, setBurnInActive] = useState(() => !shouldPlayIntro());

  const [bubbleDismissed, setBubbleDismissed] = useState(
    () => localStorage.getItem("musicBubbleDismissed") === "true",
  );
  const [showAudioBlockedBubble, setShowAudioBlockedBubble] = useState(false);
  const [cardBurnDone, setCardBurnDone] = useState(false);

  const { completedWords, inProgress } = useTypewriter(
    tooltipText,
    cardBurnDone,
    0,
  );

  // After 1s post-intro, if music is enabled but audio hasn't started (browser blocked autoplay),
  // show the "browsers block music" speech bubble.
  useEffect(() => {
    if (!isMusicActive) return;
    if (introActive) return;
    const timer = setTimeout(() => {
      if (!audioPlayer.isPlaying()) setShowAudioBlockedBubble(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [introActive]);

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
  }, [completedWords, inProgress]);

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem("musicBubbleDismissed", "true");
    setBubbleDismissed(true);
  };

  const showMusicBubble =
    (isMusicActive && showAudioBlockedBubble) ||
    (!isMusicActive && !bubbleDismissed);

  if (isDebugSwirl) return <DebugSwirl />;

  return (
    <Wrapper>
      {introActive && (
        <IntroSequence
          cardTexture={cardTexture}
          onRevealStart={() =>
            setTimeout(
              () => setBurnInActive(true),
              BURN_IN_AFTER_INTRO_DELAY_MS,
            )
          }
          onComplete={() => {
            setIntroActive(false);
            localStorage.setItem("introPlayed", "true");
            localStorage.removeItem("replayIntro");
            if (isMusicEnabled()) audioPlayer.start();
          }}
        />
      )}

      <BurnRevealFilter
        active={burnInActive}
        onCardComplete={() => setCardBurnDone(true)}
      />
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
            $src={`/jokers/${cardTexture}.png`}
            alt="Personal card"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            draggable={false}
          />
          <JimboTooltipWrapper $visible={cardBurnDone && !hasDragged}>
            <JimboTooltipArrow />
            <JimboTooltipBubble>
              <JimboTooltipText>
                {completedWords.map((word, i) => (
                  <span key={i}>
                    <TooltipWord>{word}</TooltipWord>{" "}
                  </span>
                ))}
                {inProgress}
              </JimboTooltipText>
            </JimboTooltipBubble>
          </JimboTooltipWrapper>
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
            onClick={() => dispatch(openModal("skills"))}
          >
            Skills
          </MenuButton>
        </ButtonsContainer>

        <SocialsRow>
          <MusicButtonWrapper>
            <SocialIconButton
              as="button"
              $bgColor={isMusicActive ? "#27ae60" : "#c0392b"}
              onClick={() => dispatch(openModal("music"))}
            >
              {isMusicActive ? <MusicOnIcon /> : <MusicOffIcon />}
            </SocialIconButton>
            {showMusicBubble &&
              (isMusicActive ? (
                <MusicSpeechBubble>
                  <MusicBubbleBox>
                    browsers block music — click the button to enable it
                  </MusicBubbleBox>
                  <MusicBubbleArrow />
                </MusicSpeechBubble>
              ) : (
                <MusicSpeechBubble>
                  <MusicBubbleBox>
                    this site is{" "}
                    <strong
                      style={{
                        color: "red",
                        fontWeight: 500,
                        fontSize: "1.8rem",
                      }}
                    >
                      way
                    </strong>{" "}
                    better with music I promise
                    <MusicBubbleDismiss onClick={handleDismissBubble}>
                      ×
                    </MusicBubbleDismiss>
                  </MusicBubbleBox>
                  <MusicBubbleArrow />
                </MusicSpeechBubble>
              ))}
          </MusicButtonWrapper>
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

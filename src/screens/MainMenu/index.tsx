import { type FC, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { BalatroBackground } from "../../components/three/BalatroBackground";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openModal, selectMusicEnabled } from "../../store/slices/navigation";
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
} from "./MainMenuStyles";
import { DRAG_TAUNTS } from "../../constants";
import { BalatroButton } from "../../components/ui/BalatroButton";

const isTouch = window.matchMedia("(pointer: coarse)").matches;
const DEFAULT_TAUNT = { touch: "Hold and drag the card", mouse: "Click and drag the card" };
const taunt = DRAG_TAUNTS[Math.floor(Math.random() * DRAG_TAUNTS.length)] ?? DEFAULT_TAUNT;

const personalCards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const cardTexture =
  personalCards[Math.floor(Math.random() * personalCards.length)] ??
  personalCards[0];

const VOICE_COUNT = 11;

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
      frames.push({ state: { completedWords: [...done], inProgress: "" }, delay: elapsed });
    } else {
      word += char;
      if (isLast) {
        done.push(word);
        frames.push({ state: { completedWords: [...done], inProgress: "" }, delay: elapsed });
      } else {
        frames.push({ state: { completedWords: [...done], inProgress: word }, delay: elapsed });
      }
    }
  }

  return frames;
};

const useTypewriter = (text: string, active: boolean, seed: number) => {
  const [state, setState] = useState<TypewriterState>({ completedWords: [], inProgress: "" });

  useEffect(() => {
    if (!active) {
      setState({ completedWords: [], inProgress: "" });
      return;
    }
    setState({ completedWords: [], inProgress: "" });
    const frames = buildTypewriterFrames(text);
    const ids = frames.map(({ state: s, delay }) => setTimeout(() => setState(s), delay));
    return () => ids.forEach(clearTimeout);
  }, [active, text, seed]);

  return state;
};

export const MainMenu: FC = () => {
  const dispatch = useAppDispatch();
  const musicEnabled = useAppSelector(selectMusicEnabled);
  const { cardRef, onPointerDown, onPointerMove, onPointerUp } = useCardDrag();
  const tooltipText = isTouch ? taunt.touch : taunt.mouse;
  const [typewriterSeed, setTypewriterSeed] = useState(0);
  const { completedWords, inProgress } = useTypewriter(tooltipText, true, typewriterSeed);

  // When music turns on mid-session (user just clicked "Let's go!"),
  // audio is already unlocked — restart typewriter so voices play immediately.
  const prevMusicEnabled = useRef(musicEnabled);
  useEffect(() => {
    if (musicEnabled && !prevMusicEnabled.current) {
      setTypewriterSeed(s => s + 1);
    }
    prevMusicEnabled.current = musicEnabled;
  }, [musicEnabled]);

  // On hard page reload with musicEnabled=true, audio may be blocked until
  // the user first interacts. Restart typewriter at that point so voices play.
  useEffect(() => {
    if (!musicEnabled) return;
    const restart = () => setTypewriterSeed(s => s + 1);
    document.addEventListener("click", restart, { once: true });
    document.addEventListener("keydown", restart, { once: true });
    return () => {
      document.removeEventListener("click", restart);
      document.removeEventListener("keydown", restart);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevCharCount = useRef(0);
  useEffect(() => {
    const count = completedWords.reduce((sum, w) => sum + w.length, 0) + inProgress.length;
    if (musicEnabled && count > prevCharCount.current) {
      playVoice();
    }
    prevCharCount.current = count;
  }, [completedWords, inProgress, musicEnabled]);

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
          <JimboTooltipWrapper $visible={true}>
            <JimboTooltipArrow />
            <JimboTooltipBubble>
              <JimboTooltipText>
                {completedWords.map((word, i) => (
                  <span key={i}><TooltipWord>{word}</TooltipWord>{" "}</span>
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
          <BalatroButton color="grey" href="/docs/josephFloresATS.pdf" target="_blank" rel="noopener noreferrer">Joseph</BalatroButton>
        </ProfileContainer>

        <ButtonsContainer>
          <PlayButton
            color="blue"
            onClick={() => dispatch(openModal("play"))}
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
            as="button"
            $bgColor={musicEnabled ? "#27ae60" : "#c0392b"}
            onClick={() => dispatch(openModal("music"))}
          >
            {musicEnabled ? <MusicOnIcon /> : <MusicOffIcon />}
          </SocialIconButton>
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

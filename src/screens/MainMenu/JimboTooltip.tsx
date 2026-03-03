import { type FC } from "react";
import {
  JimboTooltipWrapper,
  JimboTooltipArrow,
  JimboTooltipBubble,
  JimboTooltipText,
  TooltipWord,
} from "./MainMenuStyles";

type Props = {
  completedWords: string[];
  inProgress: string;
  visible: boolean;
};

export const JimboTooltip: FC<Props> = ({ completedWords, inProgress, visible }) => {
  if (!visible) return null;

  return (
    <JimboTooltipWrapper $visible={true}>
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
  );
};

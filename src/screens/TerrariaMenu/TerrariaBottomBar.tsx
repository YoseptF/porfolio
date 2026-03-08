import { type FC } from 'react'
import styled from 'styled-components'
import { GitHubIcon, LinkedInIcon, ResumeIcon } from '../MainMenu/SocialIcons'

const Bar = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Version = styled.span`
  font-family: 'Andy Bold', sans-serif;
  font-size: 14px;
  color: #aaa;
`

const Icons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #aaa;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.1s;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  &:hover {
    opacity: 1;
  }
`

export const TerrariaBottomBar: FC = () => (
  <Bar>
    <Version>v1.0 · PORTFOLIO</Version>
    <Icons>
      <IconLink href="https://github.com/YoseptF" target="_blank" rel="noopener noreferrer">
        <GitHubIcon />
      </IconLink>
      <IconLink href="https://www.linkedin.com/in/joseph-flores-vega/" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </IconLink>
      <IconLink href="/docs/josephFloresATS.pdf" target="_blank" rel="noopener noreferrer">
        <ResumeIcon />
      </IconLink>
    </Icons>
  </Bar>
)

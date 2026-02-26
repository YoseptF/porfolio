import { type FC } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../components/three/BalatroBackground'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroButton } from '../components/ui/BalatroButton'
import { BalatroPanel } from '../components/ui/BalatroPanel'
import { useAppDispatch } from '../store/hooks'
import { navigateTo } from '../store/slices/navigation'
import { theme } from '../styles/theme'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  padding: 20px;
`

const PanelContainer = styled.div`
  pointer-events: auto;
  max-width: 460px;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Input = styled.input`
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: ${theme.colors.text.white};
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid ${theme.colors.panel.border};
  border-radius: ${theme.radii.md};
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.button.blue};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`

const TextArea = styled.textarea`
  font-family: ${theme.font.family};
  font-size: 1rem;
  color: ${theme.colors.text.white};
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid ${theme.colors.panel.border};
  border-radius: ${theme.radii.md};
  padding: 10px 14px;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.button.blue};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`

const SocialRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  justify-content: center;

  a {
    color: ${theme.colors.text.gold};
    text-decoration: none;
    font-family: ${theme.font.family};
    font-size: 1rem;
    transition: color 0.2s;

    &:hover {
      color: ${theme.colors.text.white};
    }
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
`

export const Contact: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground
          color1={[0.91, 0.36, 0.29]}
          color2={[0.65, 0.20, 0.20]}
          color3={[0.06, 0.03, 0.03]}
          spinSpeed={0.3}
        />
      </Canvas>

      <Overlay>
        <PanelContainer>
          <BalatroPanel title="CONTACT">
            <Form action="https://formspree.io/xvovpedq" method="POST">
              <BalatroText variant="body">Send me a message!</BalatroText>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="off"
              />
              <Input
                name="subject"
                type="text"
                placeholder="Subject"
                required
                autoComplete="off"
              />
              <TextArea
                name="message"
                placeholder="Your message..."
                required
                autoComplete="off"
              />
              <ButtonRow>
                <BalatroButton color="green">
                  Send
                </BalatroButton>
                <BalatroButton color="purple" onClick={() => dispatch(navigateTo('menu'))}>
                  Back
                </BalatroButton>
              </ButtonRow>
            </Form>

            <SocialRow>
              <a href="https://github.com/YoseptF" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/joseph-flores-vega/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </SocialRow>
          </BalatroPanel>
        </PanelContainer>
      </Overlay>
    </Wrapper>
  )
}

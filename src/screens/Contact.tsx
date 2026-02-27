import { type FC } from 'react'
import styled from 'styled-components'
import { BalatroText } from '../components/ui/BalatroText'
import { BalatroButton } from '../components/ui/BalatroButton'
import { BalatroPanel } from '../components/ui/BalatroPanel'
import { ModalWrapper } from '../components/ui/ModalWrapper'
import { useAppDispatch } from '../store/hooks'
import { closeModal } from '../store/slices/navigation'
import { theme } from '../styles/theme'

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
`

export const Contact: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <ModalWrapper maxWidth="460px" onBack={() => dispatch(closeModal())}>
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
    </ModalWrapper>
  )
}

import { type FC } from 'react'
import styled from 'styled-components'
import { Text } from '../components/ui/Text'
import { Button } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'
import { ModalWrapper } from '../components/ui/ModalWrapper'
import { ThemedInput, ThemedTextArea } from '../components/ui/ThemedInput'
import { useAppDispatch } from '../store/hooks'
import { closeModal } from '../store/slices/navigation'
import { theme } from '../styles/theme'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
      <Panel title="CONTACT">
        <Form action="https://formspree.io/xvovpedq" method="POST">
          <Text variant="body">Send me a message!</Text>
          <ThemedInput
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            autoComplete="off"
          />
          <ThemedInput
            name="subject"
            type="text"
            placeholder="Subject"
            required
            autoComplete="off"
          />
          <ThemedTextArea
            name="message"
            placeholder="Your message..."
            required
            autoComplete="off"
          />
          <ButtonRow>
            <Button color="green">
              Send
            </Button>
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
      </Panel>
    </ModalWrapper>
  )
}

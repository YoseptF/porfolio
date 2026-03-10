import { type FC, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { closeModal } from '../../store/slices/navigation'
import { Button } from '../../components/ui/Button'
import { Panel } from '../../components/ui/Panel'
import { ModalWrapper } from '../../components/ui/ModalWrapper'
import { useProjects } from '../../data/useProjects'

// TODO: Use this config for the real Balatro playthrough background
// when implementing the actual game screen.
export const PROJECT_BG_CONFIG = {
  color1: [0.15, 0.72, 0.52, 1.0],
  color2: [0.04, 0.22, 0.16, 1.0],
  color3: [0.02, 0.07, 0.05, 1.0],
  spinAmount: 0.25,
  spinSpeed: 0.5,
  spinEase: 0.5,
  contrast: 1.2,
  pixelFilter: 1000.0,
  zoom: 30.0,
} as const

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TopButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`

const PickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const DeckCard = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
`

const CardImage = styled.img`
  width: 72px;
  height: 100px;
  object-fit: cover;
  flex-shrink: 0;
`

const CardDetails = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ProjectName = styled.div`
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
`

const ProjectDescription = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
  line-height: 1.4;
`

const DotsRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`

const Dot = styled.span<{ $active: boolean }>`
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.3)')};
`

const StakeCard = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
`

const ChipIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.5);
  background: repeating-conic-gradient(#888 0% 25%, #555 0% 50%) 0 0 / 8px 8px;
  flex-shrink: 0;
`

const TagName = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 0.9rem;
`

/*
 * NavArrow overrides: Balatro wraps button in ShadowWrapper (div), so `& button` targets
 * the inner button. Terraria renders the button directly, so `&:is(button)` targets it.
 */
const NavArrow = styled(Button)`
  & button,
  &:is(button) {
    height: 72px;
    min-width: 36px;
    padding: 4px 10px;
  }
`

const PlayRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
`

export const PlayModal: FC = () => {
  const dispatch = useAppDispatch()
  const { projects, loading } = useProjects()
  const [projectIndex, setProjectIndex] = useState(0)
  const [tagIndex, setTagIndex] = useState(0)

  const project = projects[projectIndex]
  const tag = project?.tags[tagIndex] ?? ''

  const cycleProject = (dir: 1 | -1) => {
    setProjectIndex((i) => (i + dir + projects.length) % projects.length)
    setTagIndex(0)
  }

  const cycleTag = (dir: 1 | -1) => {
    if (!project) return
    setTagIndex((i) => (i + dir + project.tags.length) % project.tags.length)
  }

  return (
    <ModalWrapper maxWidth="min(700px, 95vw)" onBack={() => dispatch(closeModal())}>
      <Panel title="Choose your project">
        <ContentLayout>
          <TopButtons>
            {project?.demo ? (
              <Button color="green" href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Button>
            ) : (
              <Button color="green" disabled>
                Live Demo
              </Button>
            )}
            <Button color="grey" disabled>
              Continue
            </Button>
            {project ? (
              <Button color="blue" href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub Code
              </Button>
            ) : (
              <Button color="blue" disabled>
                GitHub Code
              </Button>
            )}
          </TopButtons>

          {!loading && project && (
            <>
              <PickerRow>
                <NavArrow color="red" onClick={() => cycleProject(-1)}>{'<'}</NavArrow>
                <DeckCard>
                  <CardImage src={`/cards/${project.texture}.png`} alt={project.name} />
                  <CardDetails>
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectDescription>{project.description}</ProjectDescription>
                  </CardDetails>
                </DeckCard>
                <NavArrow color="red" onClick={() => cycleProject(1)}>{'>'}</NavArrow>
              </PickerRow>

              <DotsRow>
                {projects.map((_, i) => (
                  <Dot key={i} $active={i === projectIndex} />
                ))}
              </DotsRow>

              <PickerRow>
                <NavArrow color="red" onClick={() => cycleTag(-1)}>{'<'}</NavArrow>
                <StakeCard>
                  <ChipIcon />
                  <TagName>{tag}</TagName>
                </StakeCard>
                <NavArrow color="red" onClick={() => cycleTag(1)}>{'>'}</NavArrow>
              </PickerRow>

              <DotsRow>
                {project.tags.map((_, i) => (
                  <Dot key={i} $active={i === tagIndex} />
                ))}
              </DotsRow>
            </>
          )}

          <PlayRow>
            <Button color="blue" large>
              Play
            </Button>
          </PlayRow>
        </ContentLayout>
      </Panel>
    </ModalWrapper>
  )
}

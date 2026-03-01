import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '../../test/renderWithStore'
import { PlayModal } from './index'
import { openModal } from '../../store/slices/navigation'

const mockProjects = [
  {
    name: 'TestProject',
    description: 'A test description',
    texture: 'test',
    tags: ['React', 'TypeScript'],
    demo: 'https://demo.com',
    github: 'https://github.com/test',
  },
  {
    name: 'SecondProject',
    description: 'Second description',
    texture: 'other',
    tags: ['Vue'],
    demo: null,
    github: 'https://github.com/other',
  },
]

vi.mock('../../data/useProjects', () => ({
  useProjects: vi.fn(() => ({ projects: mockProjects, loading: false })),
}))

describe('PlayModal', () => {
  it('renders first project name', () => {
    renderWithStore(<PlayModal />)
    expect(screen.getByText('TestProject')).toBeInTheDocument()
  })

  it('renders first project tag', () => {
    renderWithStore(<PlayModal />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('next deck arrow cycles to second project', async () => {
    renderWithStore(<PlayModal />)
    const [nextDeck] = screen.getAllByRole('button', { name: '>' })
    if (!nextDeck) throw new Error('Expected next deck button')
    await userEvent.click(nextDeck)
    expect(screen.getByText('SecondProject')).toBeInTheDocument()
  })

  it('prev deck arrow wraps to last project', async () => {
    renderWithStore(<PlayModal />)
    const [prevDeck] = screen.getAllByRole('button', { name: '<' })
    if (!prevDeck) throw new Error('Expected prev deck button')
    await userEvent.click(prevDeck)
    expect(screen.getByText('SecondProject')).toBeInTheDocument()
  })

  it('next stakes arrow cycles tag', async () => {
    renderWithStore(<PlayModal />)
    const nextButtons = screen.getAllByRole('button', { name: '>' })
    const nextStakes = nextButtons[1]
    if (!nextStakes) throw new Error('Expected next stakes button')
    await userEvent.click(nextStakes)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders Live Demo link when demo is present', () => {
    renderWithStore(<PlayModal />)
    const link = screen.getByRole('link', { name: /live demo/i })
    expect(link).toHaveAttribute('href', 'https://demo.com')
  })

  it('renders disabled Continue button', () => {
    renderWithStore(<PlayModal />)
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
  })

  it('renders GitHub Code link', () => {
    renderWithStore(<PlayModal />)
    const link = screen.getByRole('link', { name: /github code/i })
    expect(link).toHaveAttribute('href', 'https://github.com/test')
  })

  it('dispatches closeModal when Back is clicked', async () => {
    const { store } = renderWithStore(<PlayModal />)
    store.dispatch(openModal('about'))
    expect(store.getState().navigation.activeModal).toBe('about')
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(store.getState().navigation.activeModal).toBeNull()
  })

  it('PLAY button is present', () => {
    renderWithStore(<PlayModal />)
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
  })
})

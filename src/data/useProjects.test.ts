import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useProjects } from './useProjects'

const mockProjects = [
  {
    name: 'MyEat',
    description: 'A calorie tracker',
    texture: 'myeat',
    tags: ['React'],
    demo: 'https://example.com',
    github: 'https://github.com/test',
  },
]

describe('useProjects', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts with loading true and empty projects', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    const { result } = renderHook(() => useProjects())
    expect(result.current.loading).toBe(true)
    expect(result.current.projects).toEqual([])
  })

  it('fetches and returns projects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProjects,
    }))
    const { result } = renderHook(() => useProjects())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.projects).toEqual(mockProjects)
  })

  it('returns empty array on fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const { result } = renderHook(() => useProjects())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.projects).toEqual([])
  })
})

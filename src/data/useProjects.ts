import { useState, useEffect } from 'react'
import { PROJECTS_URL } from '../constants'

export interface Project {
  name: string
  description: string
  texture: string
  tags: string[]
  demo: string | null
  github: string
}

const isProject = (item: unknown): item is Project =>
  typeof item === 'object' &&
  item !== null &&
  'name' in item &&
  'description' in item &&
  'texture' in item &&
  'tags' in item &&
  'github' in item &&
  'demo' in item

export const useProjects = (): { projects: Project[]; loading: boolean } => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(PROJECTS_URL)
      .then((r) => r.json())
      .then((data: unknown) => {
        setProjects(Array.isArray(data) ? data.filter(isProject) : [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return { projects, loading }
}

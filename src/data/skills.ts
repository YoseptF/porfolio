interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: 'frontend' | 'backend' | 'tools' | 'gamedev'
}

export const skills: Skill[] = [
  { name: 'JavaScript', level: 'expert', category: 'frontend' },
  { name: 'TypeScript', level: 'advanced', category: 'frontend' },
  { name: 'React', level: 'expert', category: 'frontend' },
  { name: 'Three.js', level: 'advanced', category: 'frontend' },
  { name: 'HTML5', level: 'expert', category: 'frontend' },
  { name: 'CSS3 / Sass', level: 'expert', category: 'frontend' },
  { name: 'Ruby on Rails', level: 'intermediate', category: 'backend' },
  { name: 'Firebase', level: 'advanced', category: 'backend' },
  { name: 'PostgreSQL', level: 'intermediate', category: 'backend' },
  { name: 'Git', level: 'advanced', category: 'tools' },
  { name: 'Photoshop', level: 'intermediate', category: 'tools' },
  { name: 'Unity / C#', level: 'intermediate', category: 'gamedev' },
  { name: 'Unreal Engine', level: 'beginner', category: 'gamedev' },
]

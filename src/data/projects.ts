interface Project {
  name: string
  description: string
  texture: string
  tags: string[]
  demo: string | null
  github: string
}

export const projects: Project[] = [
  {
    name: 'MyEat',
    description: 'Calorie tracker app to manage daily nutrition and eating habits.',
    texture: 'myeat',
    tags: ['React', 'JavaScript', 'Netlify'],
    demo: 'https://my-eat-list.netlify.app/',
    github: 'https://github.com/YoseptF/my-eat-list-frontend',
  },
  {
    name: 'Twitch Points Suite',
    description: 'Song request system using Twitch channel points.',
    texture: 'twitch',
    tags: ['React', 'Twitch API', 'Netlify'],
    demo: 'https://twitch-points-suite.netlify.app/',
    github: 'https://github.com/YoseptF/Twitch-Points-Song-Request',
  },
  {
    name: 'Lifestyle',
    description: 'A blog platform built with Ruby on Rails.',
    texture: 'lifestyle',
    tags: ['Ruby on Rails', 'PostgreSQL'],
    demo: null,
    github: 'https://github.com/YoseptF/lifestyle',
  },
  {
    name: 'Endless Jumper',
    description: 'A platformer game with infinite procedural levels.',
    texture: 'jumper',
    tags: ['JavaScript', 'Phaser', 'Game Dev'],
    demo: 'https://endless-jumper.netlify.app/',
    github: 'https://github.com/YoseptF/Endless-Jumper',
  },
  {
    name: 'Chatto',
    description: 'Real-time chat application with instant messaging.',
    texture: 'chatto',
    tags: ['React', 'WebSocket', 'Netlify'],
    demo: 'https://michato.netlify.app',
    github: 'https://github.com/YoseptF/Chato',
  },
  {
    name: 'GameXChange',
    description: 'A platform for trading video game items.',
    texture: 'game',
    tags: ['Ruby on Rails', 'PostgreSQL'],
    demo: null,
    github: 'https://github.com/YoseptF/gamexchange',
  },
]

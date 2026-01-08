import personalWebsiteImg from '@/assets/images/projects-screenshots/screenshot-of-project-personal-website.png'
import futureTechImg from '@/assets/images/projects-screenshots/screenshot-of-project-future-tech.png'
import todoListImg from '@/assets/images/projects-screenshots/screenshot-of-project-todo-list.png'

import htmlIcon from '@/assets/icons/technologies/html.svg'
import cssIcon from '@/assets/icons/technologies/css.svg'
import scssIcon from '@/assets/icons/technologies/scss.svg'
import jsIcon from '@/assets/icons/technologies/javascript.svg'
import viteIcon from '@/assets/icons/technologies/vite.svg'

import type { Projects } from '@/shared/types/projects.ts'

const projects: Projects[] = [
  {
    id: 'personal-website',
    date: '2025-12',
    dateLabel: 'December 2025',
    title: 'Personal Website',
    github: 'https://github.com/alexborovdev/personal-website',
    image: {
      src: personalWebsiteImg,
      alt: 'Screenshot of Personal Website project'
    },
    description: `
			Personal website built with HTML, SCSS, Vanilla JavaScript and Vite.
			The project follows FSD architecture and uses OOP-style JavaScript classes
			for UI logic & interactions and custom SCSS functions & mixins.
		`,
    technologies: [
      { name: 'HTML', icon: htmlIcon },
      { name: 'CSS', icon: cssIcon },
      { name: 'SCSS', icon: scssIcon },
      { name: 'JavaScript', icon: jsIcon },
      { name: 'Vite', icon: viteIcon }
    ]
  },
  {
    id: 'future-tech',
    date: '2025-12',
    dateLabel: 'December 2025',
    title: 'Future Tech Website',
    github: 'https://github.com/alexborovdev/future-tech-website',
    image: {
      src: futureTechImg,
      alt: 'Screenshot of Future Tech project'
    },
    description: `
			Responsive multi-page website built with HTML, SCSS, and
			Vanilla JavaScript. Includes custom UI components
			(Select, Tabs, Expandable Content, Video Player), BEM
			architecture, clean modular code, and
			accessibility-focused interactions.
		`,
    technologies: [
      { name: 'HTML', icon: htmlIcon },
      { name: 'CSS', icon: cssIcon },
      { name: 'SCSS', icon: scssIcon },
      { name: 'JavaScript', icon: jsIcon }
    ]
  },
  {
    id: 'todo-list',
    date: '2025-11',
    dateLabel: 'November 2025',
    title: 'To Do List',
    github: 'https://github.com/alexborovdev/todo-list',
    image: {
      src: todoListImg,
      alt: 'Screenshot of Todo project'
    },
    description: `
			Interactive Todo application built with HTML, CSS,
			and Vanilla JavaScript in an OOP architecture.
		`,
    technologies: [
      { name: 'HTML', icon: htmlIcon },
      { name: 'CSS', icon: cssIcon },
      { name: 'JavaScript', icon: jsIcon }
    ]
  }
]

export default projects
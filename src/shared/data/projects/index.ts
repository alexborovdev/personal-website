import type { Projects } from '@/shared/types/projects'
import scaffoldingToolImg from '@/assets/images/projects-screenshots/scaffolding-tool.webp'
import personalWebsiteImg from '@/assets/images/projects-screenshots/personal-website.webp'
import todoListImg from '@/assets/images/projects-screenshots/todo-list.webp'
import futureTechImg from '@/assets/images/projects-screenshots/future-tech.webp'
import viteIcon from '@/assets/icons/technologies/vite.svg'
import scssIcon from '@/assets/icons/technologies/scss.svg'
import tsIcon from '@/assets/icons/technologies/typescript.svg'
import reactIcon from '@/assets/icons/technologies/react.svg'
import nodejsIcon from '@/assets/icons/technologies/nodejs.svg'
import reactRouterIcon from '@/assets/icons/technologies/react-router.svg'
import reactHookFormIcon from '@/assets/icons/technologies/react-hook-form.svg'
import htmlIcon from '@/assets/icons/technologies/html.svg'
import cssIcon from '@/assets/icons/technologies/css.svg'
import jsIcon from '@/assets/icons/technologies/javascript.svg'

const projects: Projects[] = [
  {
    id: 'scaffolding-tool',
    date: '2026-01',
    dateLabel: 'January 2026',
    title: 'Scaffolding Tool',
    github: 'https://github.com/alexborovdev/create-vite-rts',
    image: {
      src: scaffoldingToolImg,
      alt: 'Screenshot of Scaffolding Tool project'
    },
    description: `
			Custom Vite-based scaffolding tool that extends default Vite with a production-ready
			React + TypeScript template, base routing, preconfigured Sass (SCSS), SVG handling
			and a scalable FSD architecture.
		`,
    technologies: [
      { name: 'TypeScript', icon: tsIcon },
      { name: 'Node.js', icon: nodejsIcon }
    ]
  },
  {
    id: 'personal-website',
    date: '2026-01',
    dateLabel: 'January 2026',
    title: 'Personal Website',
    github: 'https://github.com/alexborovdev/personal-website',
    image: {
      src: personalWebsiteImg,
      alt: 'Screenshot of Personal Website project'
    },
    description: `
			Personal website built with React, TypeScript and Vite. Includes
			client-side routing, modular architecture, UI animations, form handling
			with validation and EmailJS integration, accessibility best practices.
		`,
    technologies: [
      { name: 'Vite', icon: viteIcon },
      { name: 'SCSS', icon: scssIcon },
      { name: 'TypeScript', icon: tsIcon },
      { name: 'React', icon: reactIcon },
      { name: 'React Router', icon: reactRouterIcon },
      { name: 'React Hook Form', icon: reactHookFormIcon }
    ]
  },
  {
    id: 'todo-list',
    date: '2025-11',
    dateLabel: 'December 2025',
    title: 'To Do List',
    github: 'https://github.com/alexborovdev/todo-list-react',
    image: {
      src: todoListImg,
      alt: 'Screenshot of Todo project'
    },
    description: `
			Todo app built with React using custom hooks, modular architecture,
			reusable UI components, focuses on clean separation of concerns, a dedicated
			data access layer and task data managed via a json-server API.
		`,
    technologies: [
      { name: 'Vite', icon: viteIcon },
      { name: 'SCSS', icon: scssIcon },
      { name: 'JavaScript', icon: jsIcon },
      { name: 'React', icon: reactIcon }
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
			Responsive multi-page website built with HTML, SCSS, and Vanilla
			JavaScript. Includes custom UI components (Select, Tabs, Expandable
			Content, Video Player), BEM	architecture, clean modular code, and
			accessibility-focused interactions.
		`,
    technologies: [
      { name: 'HTML', icon: htmlIcon },
      { name: 'CSS', icon: cssIcon },
      { name: 'SCSS', icon: scssIcon },
      { name: 'JavaScript', icon: jsIcon }
    ]
  }
]

export default projects
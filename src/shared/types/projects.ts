export type ProjectTechnology = {
  name: string
  icon: string
}

export type ProjectImage = {
  src: string
  alt: string
}

export type ProjectInfo = {
  id: string
  date: string
  dateLabel: string
  title: string
  github: string
  description: string
  technologies: ProjectTechnology[]
}

export type Projects = {
  id: string
  date: string
  dateLabel: string
  title: string
  github: string
  image: ProjectImage
  description: string
  technologies: ProjectTechnology[]
}
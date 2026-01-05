export type ProjectTechnology = {
  name: string
  icon: string
}

export type ProjectImage = {
  src: string
  alt: string
}

export type Project = {
  id: string
  date: string
  dateLabel: string
  title: string
  github: string
  image: ProjectImage
  description: string
  technologies: ProjectTechnology[]
}
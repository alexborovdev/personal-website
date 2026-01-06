import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'hero',
  'skills',
  'portfolio',
  'contacts',
] as const

type SectionId = typeof SECTION_IDS[number]

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  useEffect(() => {
    const sections = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        })
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return activeSection
}

export default useActiveSection
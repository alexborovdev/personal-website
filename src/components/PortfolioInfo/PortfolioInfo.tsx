import type { ProjectInfo } from '@/shared/types/projects'
import UsedTechnologies from '@/components/UsedTechnologies'
import styles from './PortfolioInfo.module.scss'

const PortfolioInfo = (props: ProjectInfo) => {
  const {
    date,
    dateLabel,
    id,
    github,
    title,
    description,
    technologies
  } = props

  return (
    <div className={styles.inner}>
      <time
        className={styles.date}
        dateTime={date}
      >
        <span className="accented">{dateLabel}</span>
      </time>
      <h3
        className={styles.title}
        id={`portfolio-${id}-title`}
      >
        <a
          className={styles.link}
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${title} on GitHub`}
          aria-label={`Open ${title} on GitHub`}
        >
          {title}
        </a>
      </h3>
      <div
        className={styles.description}
        id={`portfolio-${id}-desc`}
      >
        <p>{description}</p>
      </div>
      <div className={styles.technologies}>
        <UsedTechnologies technologies={technologies} />
      </div>
    </div>
  )
}

export default PortfolioInfo
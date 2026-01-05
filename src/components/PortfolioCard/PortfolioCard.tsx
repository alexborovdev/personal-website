import type { Project } from '@/shared/types/project'
import styles from './PortfolioCard.module.scss'

type PortfolioCardProps = Project

const PortfolioCard = (props: PortfolioCardProps) => {
  const {
    id,
    date,
    dateLabel,
    title,
    github,
    image,
    description,
    technologies
  } = props

  return (
    <li
      className={`tile ${styles.item}`}
      aria-labelledby={`portfolio-${id}-title`}
      aria-describedby={`portfolio-${id}-desc`}
    >
      <div className={styles.left}>
        <div
          className={styles.leftInner}
        >
          <a
            className={styles.leftLink}
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            title="Open full size image"
            aria-label="Open full size image"
          >
            <img
              className={styles.leftImage}
              src={image.src}
              alt={image.alt}
              width={540}
              height={320}
              loading="lazy"
            />
          </a>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
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
              title="GitHub"
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
            <h4 className="visually-hidden">
              Technologies used in project
            </h4>
            <ul
              className={styles.technologiesList}
            >
              {technologies.map(tech => (
                <li
                  key={tech.name}
                  className={styles.technologiesItem}
                >
                  <img
                    className={styles.technologiesImage}
                    src={tech.icon}
                    alt={tech.name}
                    title={tech.name}
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}

export default PortfolioCard
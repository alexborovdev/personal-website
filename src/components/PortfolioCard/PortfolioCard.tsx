import type { Projects } from '@/shared/types/projects'
import PortfolioImage from '@/components/PortfolioImage'
import PortfolioInfo from '@/components/PortfolioInfo'
import styles from './PortfolioCard.module.scss'

type Props = Projects

const PortfolioCard = (props: Props) => {
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
      data-animate
    >
      <div>
        <PortfolioImage image={image} />
      </div>
      <div>
        <PortfolioInfo
          date={date}
          dateLabel={dateLabel}
          id={id}
          github={github}
          title={title}
          description={description}
          technologies={technologies}
        />
      </div>
    </li>
  )
}

export default PortfolioCard
import type { ProjectImage } from '@/shared/types/projects'
import styles from './PortfolioImage.module.scss'

type Props = {
  image: ProjectImage
}

const PortfolioImage = (props: Props) => {
  const { image } = props

  return (
    <div className={styles.inner}>
      <a
        className={styles.link}
        href={image.src}
        target="_blank"
        rel="noopener noreferrer"
        title="Open full size image"
        aria-label="Open full size image"
      >
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={540}
          height={320}
          loading="lazy"
        />
      </a>
    </div>
  )
}

export default PortfolioImage
import projects from '@/shared/data/projects'
import useAnimateOnScroll from '@/shared/hooks/useAnimateOnScroll'
import PortfolioCard from '@/components/PortfolioCard'
import styles from './Portfolio.module.scss'

const Portfolio = () => {
  const animateRef = useAnimateOnScroll()

  return (
    <section
      ref={animateRef}
      id="portfolio"
      aria-labelledby="portfolio-title"
      className={styles.portfolio}
      data-animate
    >
      <div className={`container ${styles.content}`}>
        <h2
          id="portfolio-title"
          className={styles.mainTitle}
          data-animate
        >
          My <span className="accented">Portfolio</span>
        </h2>
        <ul className={styles.list}>
          {projects.map(project => (
            <PortfolioCard
              key={project.id}
              {...project}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Portfolio
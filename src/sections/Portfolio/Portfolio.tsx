import projects from '@/shared/data/projects'
import PortfolioCard from '@/components/PortfolioCard'
import styles from './Portfolio.module.scss'

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className={styles.portfolio}
    >
      <div className={`container ${styles.content}`}>
        <h2
          id="portfolio-title"
          className={styles.mainTitle}
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
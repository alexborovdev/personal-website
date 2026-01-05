import { motion } from 'framer-motion'
import PortfolioCard from '@/components/PortfolioCard'
import projects from '@/shared/data/projects'
import { container, items } from '@/shared/animations/portfolio.ts'
import styles from './Portfolio.module.scss'

const Portfolio = () => {
  return (
    <motion.section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className={styles.portfolio}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20%' }}
    >
      <div className={`container ${styles.content}`}>
        <motion.h2
          id="portfolio-title"
          className={styles.mainTitle}
          variants={items}
        >
          My <span className="accented">Portfolio</span>
        </motion.h2>
        <ul className={styles.list}>
          {projects.map(project => (
            <PortfolioCard
              key={project.id}
              {...project}
            />
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

export default Portfolio
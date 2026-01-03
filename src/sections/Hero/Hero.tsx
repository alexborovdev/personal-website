import styles from './Hero.module.scss'

const Hero = () => {
  return (
    <section id="hero" aria-labelledby="hero-title" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <h2 id="hero-title" className="visually-hidden">About Me</h2>
        <div className={styles.description}>
          <h3 className={styles.title}><span className="accented">Hello!</span> My name is Alex&nbsp;Borov</h3>
          <h4 className={styles.subtitle}
          >
            I'm a <span className="accented">frontend developer</span>.<br />
            I can do <span className="accented">something great</span> for you.
          </h4>
        </div>
        <button className={styles.button}>Lets check!</button>
      </div>
    </section>
  )
}

export default Hero
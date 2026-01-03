import ThemeToggle from '@/components/ThemeToggle'
import styles from './Header.module.scss'

const Header = () => {
  const navMenu = [
    {
      id: 'about',
      label: 'About',
      title: 'Scroll to About section',
      url: '#about',
    },
    {
      id: 'skills',
      label: 'Skills',
      title: 'Scroll to Skills section',
      url: '#skills',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      title: 'Scroll to Portfolio section',
      url: '#portfolio',
    },
    {
      id: 'contacts',
      label: 'Contacts',
      title: 'Scroll to Contacts section',
      url: '#contacts',
    }
  ]

  return (
    <header id="header">
      <div className={`container ${styles.content}`}>
        <div>
          <a
            href="#"
            title="Scroll to top"
            aria-label="Scroll to top">
            <svg
              aria-hidden="true"
              height="50px"
              width="50px"
              viewBox="0 0 502.664 502.664"
            >
              <path
                fill="#d1d5db"
                d="M153.821,358.226L0,274.337v-46.463l153.821-83.414v54.574L46.636,250.523l107.185,53.431
			C153.821,303.954,153.821,358.226,153.821,358.226z"
              />
              <path
                fill="#d1d5db"
                d="M180.094,387.584L282.103,115.08h32.227L212.084,387.584H180.094z"
              />
              <path
                fill="#d1d5db"
                d="M348.843,358.226v-54.272l107.164-52.999l-107.164-52.59v-53.927l153.821,83.522v46.183
			L348.843,358.226z"
              />

            </svg>
          </a>
        </div>
        <div className={styles.wrapper}>
          <nav aria-label="Main navigation">
            <ul className={styles.list}>
              {navMenu.map(({ id, label, title, url }) => {
                return (
                  <li key={id} className={styles.item}>
                    <a className={styles.link} href={url} title={title}>{label}</a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
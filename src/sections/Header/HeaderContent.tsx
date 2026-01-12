import LinkButton from '@/shared/ui/LinkButton'
import LogoIcon from '@/assets/icons/logo.svg?react'
import MainNavigation from '@/components/MainNavigation'
import MainSettings from '@/components/MainSettings'

type Props = {
  className: string
  scrollTo: (id: string) => void
  styles: Record<string, string>
}

const HeaderContent = (props: Props) => {
  const {
    className,
    styles,
    scrollTo
  } = props

  return (
    <header id="header" className={className}>
      <div className={`container ${styles.content}`}>
        <LinkButton
          className={styles.logo}
          href={'#hero'}
          title="Scroll to top"
          ariaLabel="Scroll to top"
          onClick={(event) => {
            event.preventDefault()
            scrollTo('hero')
          }
          }
        >
          <LogoIcon />
        </LinkButton>
        <div className={styles.wrapper}>
          <MainNavigation scrollTo={scrollTo} />
          <MainSettings />
        </div>
      </div>
    </header>
  )
}

export default HeaderContent
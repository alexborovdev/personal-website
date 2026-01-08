import Button from '@/shared/ui/Button'
import Logo from '@/shared/ui/Logo'
import MainNavigation from '@/components/MainNavigation'
import MainSettings from '@/components/MainSettings'

type HeaderContentProps = {
  className: string
  scrollTo: (id: string) => void
  styles: Record<string, string>
}

const HeaderContent = (props: HeaderContentProps) => {
  const {
    className,
    styles,
    scrollTo
  } = props

  return (
    <header id="header" className={className}>
      <div className={`container ${styles.content}`}>
        <Button
          className={styles.logo}
          title="Scroll to top"
          ariaLabel="Scroll to top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          <Logo />
        </Button>
        <div className={styles.wrapper}>
          <MainNavigation scrollTo={scrollTo} />
          <MainSettings />
        </div>
      </div>
    </header>
  )
}

export default HeaderContent
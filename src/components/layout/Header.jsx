import { useEffect, useState } from 'react'
import { DesktopNav } from '../navigation/DesktopNav'
import { MobileDrawer } from '../navigation/MobileDrawer'
import { IconButton } from '../ui/IconButton'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../ui/Container'
import { Logo } from './Logo'
import styles from './Header.module.css'

export function Header({ overlay = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClass = [
    styles.header,
    overlay ? styles.overlay : styles.solid,
    overlay && scrolled ? styles.scrolled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <Container className={styles.inner}>
        <Logo />
        <DesktopNav />
        <div className={styles.right}>
          <LinkButton to="/preinscription" className={styles.cta}>
            Préinscription
          </LinkButton>
          <IconButton
            className={styles.menu}
            label="Ouvrir le menu"
            onDark={overlay}
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 5.25h14v1.5H3zm0 4h14v1.5H3zm0 4h14v1.5H3z"
              />
            </svg>
          </IconButton>
        </div>
      </Container>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

import { useEffect, useState } from 'react'
import { DesktopNav } from '../navigation/DesktopNav'
import { MobileDrawer } from '../navigation/MobileDrawer'
import { IconButton } from '../ui/IconButton'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../ui/Container'
import { useAuth } from '../../hooks/useAuth'
import { Logo } from './Logo'
import styles from './Header.module.css'

export function Header({ overlay = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { session, isAdmin } = useAuth()

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
          <LinkButton
            to={session && !isAdmin ? '/compte' : '/connexion'}
            className={styles.cta}
          >
            {session && !isAdmin ? 'Mon compte' : 'Se connecter'}
          </LinkButton>
          <LinkButton to="/preinscription" variant="secondary">
            Préinscription
          </LinkButton>
          <IconButton
            className={styles.menu}
            label="Ouvrir le menu"
            onDark={overlay}
            onClick={() => setOpen(true)}
          >
            <i className="bx bx-menu" style={{ fontSize: '1.6rem' }} aria-hidden="true" />
          </IconButton>
        </div>
      </Container>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

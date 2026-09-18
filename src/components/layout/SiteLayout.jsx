import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppButton } from './WhatsAppButton'
import { ToastViewport } from '../ui/ToastViewport'
import styles from './SiteLayout.module.css'

export function SiteLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header overlay={isHome} />
      <main id="contenu" className={isHome ? styles.homeMain : styles.pageMain}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ToastViewport />
    </div>
  )
}

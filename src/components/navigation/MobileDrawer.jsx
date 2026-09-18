import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { mainNav } from '../../data/nav'
import { site } from '../../data/site'
import { useLockBody } from '../../hooks/useLockBody'
import { whatsappUrl } from '../../utils/format'
import { IconButton } from '../ui/IconButton'
import { LinkButton } from '../ui/LinkButton'
import { Logo } from '../layout/Logo'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import styles from './MobileDrawer.module.css'

export function MobileDrawer({ open, onClose }) {
  const closeRef = useRef(null)
  useLockBody(open)

  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()

    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <Logo />
          <IconButton ref={closeRef} label="Fermer le menu" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </IconButton>
        </div>
        <nav className={styles.nav}>
          {mainNav.map((item) => (
            <div key={item.to}>
              <NavLink to={item.to} className={styles.link} onClick={onClose}>
                {item.label}
              </NavLink>
              {item.children?.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={`${styles.link} ${styles.child}`}
                  onClick={onClose}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className={styles.actions}>
          <LinkButton to="/preinscription" onClick={onClose}>
            Préinscription
          </LinkButton>
          <LinkButton
            href={whatsappUrl(site.whatsapp.e164, site.whatsapp.message)}
            variant="secondary"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </LinkButton>
          <LinkButton href="tel:+237678529675" variant="outline">
            +237 678 529 675
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

import { site } from '../../data/site'
import { whatsappUrl } from '../../utils/format'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import styles from './WhatsAppButton.module.css'

export function WhatsAppButton() {
  return (
    <a
      className={styles.fab}
      href={whatsappUrl(site.whatsapp.e164, site.whatsapp.message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Parler à un conseiller sur WhatsApp"
    >
      <span className={styles.pulse} aria-hidden="true" />
      <WhatsAppIcon className={styles.icon} size={26} />
      <span className={styles.hint}>Parler à un conseiller</span>
    </a>
  )
}

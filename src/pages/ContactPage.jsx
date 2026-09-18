import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { ContactForm } from '../components/forms/ContactForm'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contacter le Groupe NO LIMIT à Yaoundé : téléphone, WhatsApp, e-mail et adresse à Emana."
        path="/contact"
      />
      <PageHero
        title="Parler à quelqu’un."
        lede="Le plus rapide : WhatsApp ou le secrétariat. Le formulaire sert aux demandes écrites."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Contact' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <p>{site.address}</p>
          <p>Horaires : {site.hours}</p>
          {site.phones.map((phone) => (
            <p key={phone.href}>
              <a href={phone.href}>
                {phone.label} · {phone.display}
              </a>
            </p>
          ))}
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <ContactForm />
        </div>
      </PageBody>
    </>
  )
}

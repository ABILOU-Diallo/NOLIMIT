import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { ContactForm } from '../components/forms/ContactForm'
import { site } from '../data/site'

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact — ISSMIGA & CFP NO LIMIT"
        description="Contacter le Groupe NO LIMIT à Yaoundé : Info@issmiga.com, Info@cfpnolimit.com, téléphone, WhatsApp et adresse à Emana."
        path="/contact"
      />
      <PageHero
        title="Contactez-nous"
        lede="Notre équipe d’orientation et d’admission est à votre disposition pour vous renseigner et vous accompagner."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Contact' },
        ]}
      />
      <PageBody>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Contact Details Card */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {/* Address */}
            <div style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy-900)' }}>
                <i className="bx bx-map-pin" style={{ color: 'var(--color-magenta-600)', fontSize: '1.4rem' }} aria-hidden="true" />
                <span>Campus & Localisation</span>
              </h2>
              <p style={{ margin: '0 0 0.4rem 0', color: 'var(--color-navy-900)', fontWeight: 500 }}>
                {site.address}
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                Horaires d’accueil : {site.hours} (Lundi au Vendredi)
              </p>
            </div>

            {/* Emails */}
            <div style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ fontSize: '1.1rem', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy-900)' }}>
                <i className="bx bx-envelope" style={{ color: 'var(--color-magenta-600)', fontSize: '1.4rem' }} aria-hidden="true" />
                <span>Adresses E-mail Officielles</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {site.emails.map((em) => (
                  <div key={em.address} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {em.label} :
                    </span>
                    <a
                      href={em.href}
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-navy-800)',
                        textDecoration: 'none'
                      }}
                    >
                      {em.address}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Phones & WhatsApp */}
            <div style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ fontSize: '1.1rem', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy-900)' }}>
                <i className="bx bx-phone-call" style={{ color: 'var(--color-magenta-600)', fontSize: '1.4rem' }} aria-hidden="true" />
                <span>Téléphone & WhatsApp</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {site.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-navy-800)',
                      textDecoration: 'none'
                    }}
                  >
                    <i
                      className={phone.label === 'WhatsApp' ? 'bx bxl-whatsapp' : 'bx bx-phone'}
                      style={{ color: phone.label === 'WhatsApp' ? '#25D366' : 'var(--color-navy-700)', fontSize: '1.25rem' }}
                      aria-hidden="true"
                    />
                    <span>{phone.label} : {phone.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0', color: 'var(--color-navy-900)' }}>
              Envoyez-nous un message écrit
            </h2>
            <p style={{ margin: '0 0 1.5rem 0', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
              Remplissez le formulaire ci-dessous et notre secrétariat vous répondra dans les plus brefs délais.
            </p>
            <ContactForm />
          </div>
        </div>
      </PageBody>
    </>
  )
}


import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Accordion } from '../components/ui/Accordion'
import { LinkButton } from '../components/ui/LinkButton'
import { admissionDocuments, admissionSteps } from '../data/admissions'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function AdmissionsPage() {
  return (
    <>
      <Seo
        title="Admissions"
        description="CQP, DQP, documents, calendrier et étapes d’inscription au Groupe NO LIMIT. Rentrée le 15 octobre 2026."
        path="/admissions"
      />
      <PageHero
        title="S’inscrire sans se perdre."
        lede={`Rentrée : ${site.rentree.date}. Cinq étapes, du choix à l’admission sur dossier.`}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Admissions' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          {admissionSteps.map((step) => (
            <section key={step.n}>
              <h2>
                {step.n} · {step.title}
              </h2>
              <p className={styles.muted}>{step.text}</p>
            </section>
          ))}
        </div>
        <h2 style={{ marginTop: '2rem' }}>CQP et DQP</h2>
        <ul>
          {site.diplomas.map((item) => (
            <li key={item.code}>
              {item.code} — {item.name} — {item.duration}
            </li>
          ))}
        </ul>
        <h2>Documents</h2>
        <Accordion
          items={admissionDocuments.map((doc, index) => ({
            id: String(index),
            title: doc,
            content: 'À déposer au campus lors de la constitution du dossier.',
          }))}
        />
        <div style={{ marginTop: '1.5rem' }}>
          <LinkButton to="/preinscription">Démarrer la préinscription</LinkButton>
        </div>
      </PageBody>
    </>
  )
}

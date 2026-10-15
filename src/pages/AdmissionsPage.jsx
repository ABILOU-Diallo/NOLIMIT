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
        title="Admissions et Inscriptions — ISSMIGA & CFP NO LIMIT Yaoundé"
        description={`Comment s'inscrire au Groupe NO LIMIT ? Découvrez les étapes d'admission, les documents requis et les modalités d'inscription pour la rentrée du ${site.rentree.date}.`}
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
        <h2 style={{ marginTop: '2rem' }}>Diplômes Préparés (BTS, Licence, Master, CQP, DQP)</h2>
        <ul>
          {site.diplomas.map((item) => (
            <li key={item.code}>
              <strong>{item.code}</strong> — {item.name} — {item.duration} ({item.school})
            </li>
          ))}
        </ul>
        <h2>Documents à Fournir</h2>
        <Accordion
          items={admissionDocuments.map((doc, index) => ({
            id: String(index),
            title: doc,
            content: 'À déposer au campus lors de la constitution physique de votre dossier de candidature.',
          }))}
        />
        <div style={{ marginTop: '1.5rem' }}>
          <LinkButton to="/preinscription">Démarrer ma préinscription en ligne</LinkButton>
        </div>
      </PageBody>
    </>
  )
}

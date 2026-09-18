import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { languageCertifications, languageLevels, languages } from '../data/languages'
import { LinkButton } from '../components/ui/LinkButton'
import styles from '../components/layout/PageHero.module.css'

export function LanguesPage() {
  return (
    <>
      <Seo
        title="Centre de langues"
        description="Allemand, anglais et français au Groupe NO LIMIT. Niveaux A1 à C2. IELTS, TOEFL, TCF, TEF, DALF, Zertifikat."
        path="/langues"
      />
      <PageHero
        title="Centre de langues"
        lede="Trois langues. Une échelle claire. Des certifications pour documenter le niveau."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Langues' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          {languages.map((lang) => (
            <article key={lang.slug}>
              <h2>{lang.name}</h2>
              {lang.bonus ? <p>{lang.bonus}</p> : null}
            </article>
          ))}
          <section>
            <h2>Niveaux</h2>
            <p>{languageLevels.join(' → ')}</p>
          </section>
          <section>
            <h2>Certifications</h2>
            <ul>
              {languageCertifications.map((item) => (
                <li key={item.code}>{item.code}</li>
              ))}
            </ul>
          </section>
          <LinkButton to="/preinscription">Préinscription langues</LinkButton>
        </div>
      </PageBody>
    </>
  )
}

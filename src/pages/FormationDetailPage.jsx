import { Link, useParams } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Badge } from '../components/ui/Badge'
import { LinkButton } from '../components/ui/LinkButton'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { poles } from '../data/poles'
import { getFormationBySlug } from '../services/formationService'
import { formatDiploma } from '../utils/format'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'
import styles from '../components/layout/PageHero.module.css'

export function FormationDetailPage() {
  const { slug } = useParams()
  const { state, data } = useAsyncData(() => getFormationBySlug(slug), [slug])
  const pole = poles.find((item) => item.id === data?.poleId)

  if (state === ASYNC.loading) {
    return (
      <PageBody>
        <Loader label="Chargement de la formation" />
      </PageBody>
    )
  }

  if (!data) {
    return (
      <PageBody>
        <h1>Formation introuvable</h1>
        <p>Cette filière n’existe pas ou n’est plus publiée.</p>
        <Link to="/formations">Retour aux formations</Link>
      </PageBody>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.title,
    provider: {
      '@type': 'EducationalOrganization',
      name: site.name,
    },
    educationalCredentialAwarded: formatDiploma(data.diploma),
  }

  return (
    <>
      <Seo
        title={data.title}
        description={data.excerpt || `${data.title} — formation ${formatDiploma(data.diploma)} au Groupe NO LIMIT.`}
        path={`/formations/${data.slug}`}
        jsonLd={jsonLd}
      />
      <PageHero
        title={data.title}
        lede={pole?.name}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/formations', label: 'Formations' },
          { label: data.title },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <div>
            <Badge>{formatDiploma(data.diploma)}</Badge>
            <span> · Durée : {data.duration}</span>
          </div>
          <p>{data.description || data.excerpt || 'Présentation détaillée à compléter.'}</p>
          <section>
            <h2>Compétences</h2>
            {data.skills?.length ? (
              <ul>
                {data.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.todo}>{/* TODO: contenu réel à fournir */}Compétences à fournir.</p>
            )}
          </section>
          <section>
            <h2>Débouchés</h2>
            {data.outlets?.length ? (
              <ul>
                {data.outlets.map((outlet) => (
                  <li key={outlet}>{outlet}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.todo}>{/* TODO: contenu réel à fournir */}Débouchés à fournir.</p>
            )}
          </section>
          <LinkButton to={`/preinscription?formation=${data.slug}`}>
            Se préinscrire à cette filière
          </LinkButton>
        </div>
      </PageBody>
    </>
  )
}

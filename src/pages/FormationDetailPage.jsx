import { Link, useParams } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Badge } from '../components/ui/Badge'
import { LinkButton } from '../components/ui/LinkButton'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getPoles } from '../services/formationService'
import { getFormationBySlug } from '../services/formationService'
import { formatDiploma } from '../utils/format'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'
import styles from '../components/layout/PageHero.module.css'

export function FormationDetailPage() {
  const { slug } = useParams()
  const { state, data } = useAsyncData(() => getFormationBySlug(slug), [slug])

  // On récupère les pôles pour avoir le nom du pôle parent
  const { data: poles } = useAsyncData(getPoles, [])
  const pole = poles?.find((item) => item.id === data?.poleId)

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
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1>Formation introuvable</h1>
          <p>Cette filière n’existe pas ou n’est plus publiée.</p>
          <LinkButton to="/formations" variant="outline">Retour au catalogue</LinkButton>
        </div>
      </PageBody>
    )
  }

  // JSON-LD Course pour Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.title,
    description: data.description || data.excerpt,
    provider: {
      '@type': 'EducationalOrganization',
      name: data.institution === 'issmiga' ? site.issmiga.fullName : site.cfp.fullName,
      sameAs: data.institution === 'issmiga' ? site.issmiga.url : site.cfp.url
    },
    educationalCredentialAwarded: formatDiploma(data.diploma),
    occupationalCredentialAwarded: data.title,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      location: 'Yaoundé, Cameroun',
      instructor: {
        '@type': 'Organization',
        name: 'Groupe NO LIMIT'
      }
    }
  }

  return (
    <>
      <Seo
        title={`${data.title} (${formatDiploma(data.diploma)})`}
        description={data.excerpt || `${data.title} — Formation professionnelle au Groupe NO LIMIT à Yaoundé. Durée : ${data.duration}.`}
        path={`/formations/${data.slug}`}
        jsonLd={jsonLd}
      />
      <PageHero
        title={data.title}
        lede={pole?.name || (data.institution === 'issmiga' ? 'Enseignement Supérieur' : 'Formation Professionnelle')}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/formations', label: 'Formations' },
          { label: data.title },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge variant={data.institution === 'issmiga' ? 'primary' : 'outline'}>
              {data.institution === 'issmiga' ? 'ISSMIGA' : 'CFP NO LIMIT'}
            </Badge>
            <Badge>{formatDiploma(data.diploma)}</Badge>
            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
              <i className='bx bx-time-five' style={{ marginRight: '4px' }} />
              Durée : {data.duration}
            </span>
          </div>

          <div style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#334155' }}>
            {data.description || data.excerpt || 'Présentation détaillée à venir.'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <section style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className='bx bx-check-double' style={{ color: 'var(--color-magenta-600)' }} /> Compétences visées
              </h2>
              {data.skills?.length ? (
                <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'grid', gap: '0.5rem' }}>
                  {data.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              ) : <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>Liste des compétences en cours de mise à jour.</p>}
            </section>

            <section style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className='bx bx-briefcase' style={{ color: 'var(--color-magenta-600)' }} /> Débouchés métiers
              </h2>
              {data.outlets?.length ? (
                <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'grid', gap: '0.5rem' }}>
                  {data.outlets.map((outlet) => <li key={outlet}>{outlet}</li>)}
                </ul>
              ) : <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>Liste des débouchés en cours de rédaction.</p>}
            </section>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, #141A5E 0%, #1e293b 100%)', borderRadius: '24px', color: '#fff' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Intéressé par cette filière ?</h3>
            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Réservez votre place dès maintenant pour la prochaine rentrée.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <LinkButton to={`/preinscription?formation=${data.slug}`} style={{ background: 'var(--color-magenta-600)', borderColor: 'var(--color-magenta-600)' }}>
                Démarrer ma préinscription
              </LinkButton>
              <LinkButton to="/contact" variant="outline" style={{ color: '#fff', borderColor: '#fff' }}>
                Demander des infos
              </LinkButton>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  )
}

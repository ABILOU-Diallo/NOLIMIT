import { Link, useParams } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getArticleBySlug } from '../services/actualiteService'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'

export function ActualiteDetailPage() {
  const { slug } = useParams()
  const { state, data } = useAsyncData(() => getArticleBySlug(slug), [slug])

  if (state === ASYNC.loading) {
    return (
      <PageBody>
        <Loader />
      </PageBody>
    )
  }

  if (!data) {
    return (
      <PageBody>
        <h1>Article introuvable</h1>
        <Link to="/actualites">Retour aux actualités</Link>
      </PageBody>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    datePublished: data.published_at,
    publisher: { '@type': 'EducationalOrganization', name: site.name },
  }

  return (
    <>
      <Seo
        title={data.title}
        description={data.excerpt || data.title}
        path={`/actualites/${data.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <PageHero
        title={data.title}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/actualites', label: 'Actualités' },
          { label: data.title },
        ]}
      />
      <PageBody>
        <article>
          {data.excerpt ? <p>{data.excerpt}</p> : null}
          <div>{data.body}</div>
        </article>
      </PageBody>
    </>
  )
}

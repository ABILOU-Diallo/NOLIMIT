import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getPublishedArticles } from '../services/actualiteService'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'
import styles from '../components/layout/PageHero.module.css'

export function ActualitesPage() {
  const { state, data, error } = useAsyncData(getPublishedArticles, [])

  return (
    <>
      <Seo
        title="Actualités"
        description={`Annonces et informations du ${site.name}.`}
        path="/actualites"
      />
      <PageHero
        title="Actualités"
        lede="Les informations publiées par le groupe apparaissent ici."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Actualités' },
        ]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Loader /> : null}
        {state === ASYNC.error ? (
          <p role="alert">
            Les actualités n’ont pas pu être chargées. {error?.message} Réessayez plus tard.
          </p>
        ) : null}
        {state === ASYNC.empty || (state === ASYNC.success && !data?.length) ? (
          <p className={styles.todo}>
            Aucune actualité publiée pour le moment. La rentrée est prévue le {site.rentree.date}.
          </p>
        ) : null}
        {data?.length ? (
          <ul className={styles.list}>
            {data.map((article) => (
              <li key={article.id}>
                <Link to={`/actualites/${article.slug}`}>
                  <h2>{article.title}</h2>
                  <p className={styles.muted}>{article.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </PageBody>
    </>
  )
}

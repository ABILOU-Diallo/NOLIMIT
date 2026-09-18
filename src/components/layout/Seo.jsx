import { Helmet } from 'react-helmet-async'
import { site } from '../../data/site'

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`
  const url = `${site.url}${path}`
  const image = `${site.url}/og-image.jpeg`

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={site.name} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}

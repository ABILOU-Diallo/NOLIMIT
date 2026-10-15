import { Helmet } from 'react-helmet-async'
import { site } from '../../data/site'

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  jsonLd,
}) {
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`
  const url = `${site.url}${path}`
  const ogImage = image ? (image.startsWith('http') ? image : `${site.url}${image}`) : `${site.url}/og-image.jpeg`

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={site.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}

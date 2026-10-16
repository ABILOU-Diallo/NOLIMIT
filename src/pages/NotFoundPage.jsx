import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { LinkButton } from '../components/ui/LinkButton'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Introuvable — Groupe NO LIMIT"
        description="Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Utilisez nos liens pour retrouver nos formations."
        path="/404"
      />
      <PageHero
        title="Oups ! Page Introuvable."
        lede="Il semble que le lien soit rompu ou que la page ait été déplacée vers une nouvelle adresse."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: '404' },
        ]}
      />
      <PageBody>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
            Ne vous inquiétez pas, vous pouvez toujours explorer nos programmes d'excellence :
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <LinkButton to="/formations">Nos Formations</LinkButton>
            <LinkButton to="/le-groupe/issmiga" variant="outline">Institut ISSMIGA</LinkButton>
            <LinkButton to="/le-groupe/cfp" variant="outline">Centre CFP</LinkButton>
          </div>
          <p style={{ marginTop: '3rem' }}>
            <Link to="/contact" style={{ color: 'var(--primary)', fontWeight: 600 }}>Signaler un problème au secrétariat</Link>
          </p>
        </div>
      </PageBody>
    </>
  )
}

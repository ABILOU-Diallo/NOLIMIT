import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { LinkButton } from '../components/ui/LinkButton'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page introuvable"
        description="Cette page n’existe pas sur le site du Groupe NO LIMIT."
        path="/404"
      />
      <PageHero
        title="Cette page n’existe pas."
        lede="Le lien est peut-être ancien. Vous pouvez revenir aux formations ou écrire au secrétariat."
      />
      <PageBody>
        <LinkButton to="/formations">Voir les formations</LinkButton>
        <p>
          <Link to="/contact">Contact</Link>
        </p>
      </PageBody>
    </>
  )
}

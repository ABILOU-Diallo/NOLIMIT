import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { LinkButton } from '../components/ui/LinkButton'
import { media } from '../data/media'
import { site } from '../data/site'
import styles from '../components/layout/PageHero.module.css'

export function IssmigaPage() {
  return (
    <>
      <Seo
        title="ISSMIGA"
        description={`${site.issmiga.fullName}. ${site.issmiga.slogan}. Yaoundé, derrière Tradex Emana.`}
        path="/le-groupe/issmiga"
      />
      <PageHero
        title={site.issmiga.name}
        lede={site.issmiga.fullName}
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe', label: 'Le Groupe' },
          { label: 'ISSMIGA' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          <p>
            ISSMIGA est l’institut supérieur du Groupe NO LIMIT. Slogan : « {site.issmiga.slogan} ».
          </p>
          <p className={styles.muted}>{site.issmiga.agrement}</p>
          <p>Début des cours annoncé : {site.issmiga.rentree}.</p>
          <figure className={styles.media}>
          <img
            src={media.flyer}
            alt="Flyer officiel ISSMIGA : inscription, filières et contacts à Yaoundé."
            width="656"
            height="872"
            loading="lazy"
          />
          </figure>
          <LinkButton to="/preinscription" variant="outline">
            Préinscription
          </LinkButton>
        </div>
      </PageBody>
    </>
  )
}

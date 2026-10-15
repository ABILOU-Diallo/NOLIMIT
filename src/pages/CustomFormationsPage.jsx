import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import CustomFormationsSection from '../components/sections/CustomFormationsSection'

export function CustomFormationsPage() {
  return (
    <>
      <Seo
        title="Formations Courtes et Certifiantes (3, 6, 9 mois) — Yaoundé"
        description="Boostez vos compétences avec nos formations à la carte au CFP NO LIMIT. Informatique, gestion, bureautique et métiers techniques. Inscription flexible toute l'année."
        path="/formations-a-la-carte"
      />
      <PageHero
        title="Formations à la Carte"
        lede="Des programmes flexibles de 03, 06 et 09 mois pour booster vos compétences selon votre rythme."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/le-groupe/cfp', label: 'CFP NO LIMIT' },
          { label: 'À la carte' }
        ]}
      />
      <PageBody>
        <div style={{ marginTop: '-2rem' }}>
          <CustomFormationsSection />
        </div>
      </PageBody>
    </>
  )
}

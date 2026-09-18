import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { PreinscriptionWizard } from '../components/forms/PreinscriptionWizard'
import { Loader } from '../components/ui/Loader'
import { useAsyncData } from '../hooks/useAsyncData'
import { getFormations } from '../services/formationService'
import { site } from '../data/site'
import { ASYNC } from '../utils/asyncState'

export function PreinscriptionPage() {
  const { state, data } = useAsyncData(getFormations, [])

  return (
    <>
      <Seo
        title="Préinscription"
        description={`Préinscription en ligne au Groupe NO LIMIT. Rentrée le ${site.rentree.date}.`}
        path="/preinscription"
      />
      <PageHero
        title="Préinscription"
        lede="Quatre étapes. Vous pouvez revenir en arrière. L’admission définitive se fait au campus."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Préinscription' },
        ]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Loader /> : null}
        {data ? <PreinscriptionWizard formations={data} /> : null}
      </PageBody>
    </>
  )
}

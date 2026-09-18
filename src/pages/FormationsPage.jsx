import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Skeleton } from '../components/ui/Skeleton'
import { useAsyncData } from '../hooks/useAsyncData'
import { getFormations, getPoles, searchFormations } from '../services/formationService'
import { formatDiploma } from '../utils/format'
import { ASYNC } from '../utils/asyncState'
import styles from '../components/layout/PageHero.module.css'

export function FormationsPage() {
  const [query, setQuery] = useState('')
  const [poleId, setPoleId] = useState('')
  const { state, data, error } = useAsyncData(async () => {
    const [poles, formations] = await Promise.all([getPoles(), getFormations()])
    return { poles, formations }
  }, [])

  const results = useMemo(() => {
    if (!data) return []
    return searchFormations(data.formations, query, poleId)
  }, [data, query, poleId])

  return (
    <>
      <Seo
        title="Formations"
        description="Cinq pôles de formation au Groupe NO LIMIT : numérique, cybersécurité, gestion, métiers créatifs, santé et QHSE."
        path="/formations"
      />
      <PageHero
        title="Les formations, par pôle."
        lede="Recherchez une filière ou filtrez. Chaque fiche reste courte : l’essentiel, puis un CTA."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Formations' },
        ]}
      />
      <PageBody>
        {state === ASYNC.loading ? <Skeleton height="12rem" /> : null}
        {state === ASYNC.error ? (
          <p role="alert">
            Impossible de charger le catalogue. {error?.message} Vous pouvez réessayer ou
            appeler le secrétariat.
          </p>
        ) : null}
        {data ? (
          <>
            <div className={styles.filters}>
              <Input
                id="recherche"
                label="Rechercher une filière"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex. cybersécurité, infographie…"
              />
              <Select
                id="pole"
                label="Pôle"
                value={poleId}
                onChange={(event) => setPoleId(event.target.value)}
              >
                <option value="">Tous les pôles</option>
                {data.poles.map((pole) => (
                  <option key={pole.id} value={pole.id}>
                    {pole.name}
                  </option>
                ))}
              </Select>
            </div>
            {results.length === 0 ? (
              <p className={styles.todo}>
                Aucune filière ne correspond. Effacez la recherche ou changez de pôle.
              </p>
            ) : (
              <div className={styles.list}>
                {results.map((item) => (
                  <Link key={item.slug} to={`/formations/${item.slug}`} className={styles.result}>
                    <strong>{item.title}</strong>
                    <div>
                      <Badge>{formatDiploma(item.diploma)}</Badge> · {item.duration}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : null}
      </PageBody>
    </>
  )
}

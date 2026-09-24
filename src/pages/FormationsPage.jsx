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
  const [institution, setInstitution] = useState('all')

  const { state, data, error } = useAsyncData(async () => {
    const [poles, formations] = await Promise.all([getPoles(), getFormations()])
    return { poles, formations }
  }, [])

  const results = useMemo(() => {
    if (!data) return []
    return searchFormations(data.formations, query, poleId, institution)
  }, [data, query, poleId, institution])

  return (
    <>
      <Seo
        title="Formations"
        description="Catalogue complet des formations CFP NO LIMIT (CQP, DQP) et ISSMIGA (BTS, Licence, Master) à Yaoundé."
        path="/formations"
      />
      <PageHero
        title="Formations & Filières d’Études"
        lede="Classées par établissement (CFP NO LIMIT & ISSMIGA) et par pôle d’expertise."
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
                placeholder="Ex. comptabilité, génie logiciel, infographie…"
              />
              <Select
                id="institution"
                label="Établissement"
                value={institution}
                onChange={(event) => setInstitution(event.target.value)}
              >
                <option value="all">Toutes les écoles</option>
                <option value="cfp">CFP NO LIMIT (CQP / DQP)</option>
                <option value="issmiga">ISSMIGA (BTS / Licence / Master)</option>
              </Select>
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
                Aucune filière ne correspond. Effacez la recherche ou changez de filtres.
              </p>
            ) : (
              <div className={styles.list}>
                {results.map((item) => (
                  <Link key={item.slug} to={`/formations/${item.slug}`} className={styles.result}>
                    <div>
                      <strong>{item.title}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <Badge variant={item.institution === 'issmiga' ? 'primary' : 'outline'}>
                        {item.institution === 'issmiga' ? 'ISSMIGA' : 'CFP NO LIMIT'}
                      </Badge>
                      <Badge>{formatDiploma(item.diploma)}</Badge>
                      <span>· {item.duration}</span>
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

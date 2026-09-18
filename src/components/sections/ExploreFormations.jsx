import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { LinkButton } from '../ui/LinkButton'
import { SectionHeading } from '../ui/SectionHeading'
import { Tabs } from '../ui/Tabs'
import { formatDiploma } from '../../utils/format'
import styles from './ExploreFormations.module.css'

export function ExploreFormations({ poles, formations }) {
  const [poleId, setPoleId] = useState(poles[0]?.id)
  const visible = useMemo(
    () => formations.filter((item) => item.poleId === poleId),
    [formations, poleId],
  )
  const current = poles.find((pole) => pole.id === poleId)

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="03 — Formations"
          title="Explorer par pôle, pas par catalogue illisible."
          lede="Cinq familles de métiers. Choisissez un pôle, parcourez les filières, ouvrez celle qui vous concerne."
        />
        <div className={styles.layout}>
          <Tabs
            label="Pôles de formation"
            tabs={poles.map((pole) => ({
              id: pole.id,
              label: pole.name,
              content: (
                <div>
                  <p>{current?.description}</p>
                  <div className={styles.list}>
                    {visible.map((formation) => (
                      <Link
                        key={formation.slug}
                        className={styles.row}
                        to={`/formations/${formation.slug}`}
                      >
                        <strong>{formation.title}</strong>
                        <span className={styles.meta}>
                          <Badge>{formatDiploma(formation.diploma)}</Badge>
                          {' · '}
                          {formation.duration}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.more}>
                    <LinkButton to="/formations" variant="outline">
                      Voir toutes les formations
                    </LinkButton>
                  </div>
                </div>
              ),
            }))}
            defaultId={poleId}
            onChange={setPoleId}
          />
        </div>
      </Container>
    </section>
  )
}

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
  const [institution, setInstitution] = useState('all') // 'all' | 'cfp' | 'issmiga'
  const [poleId, setPoleId] = useState(poles[0]?.id)

  const visible = useMemo(() => {
    return formations.filter((item) => {
      const poleOk = item.poleId === poleId
      const instOk = institution === 'all' || item.institution === institution
      return poleOk && instOk
    })
  }, [formations, poleId, institution])

  const current = poles.find((pole) => pole.id === poleId)

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="03 — Nos Écoles & Formations"
          title="Filières classées par école et par pôle."
          lede="Choisissez un établissement (CFP NO LIMIT pour CQP/DQP ou ISSMIGA pour BTS/Licence/Master), puis explorez les filières."
        />

        <div className={styles.schoolPicker} role="group" aria-label="Filtrer par établissement">
          <button
            type="button"
            className={[styles.schoolBtn, institution === 'all' ? styles.active : ''].join(' ')}
            onClick={() => setInstitution('all')}
          >
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-grid-alt" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
              <strong>Toutes les formations</strong>
            </div>
          </button>
          <button
            type="button"
            className={[styles.schoolBtn, styles.cfpBtn, institution === 'cfp' ? styles.active : ''].join(' ')}
            onClick={() => setInstitution('cfp')}
          >
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-briefcase-alt-2" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
              <strong>CFP NO LIMIT</strong>
            </div>
            <span>CQP & DQP (1 an)</span>
          </button>
          <button
            type="button"
            className={[styles.schoolBtn, styles.issmigaBtn, institution === 'issmiga' ? styles.active : ''].join(' ')}
            onClick={() => setInstitution('issmiga')}
          >
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <i className="bx bx-graduation" style={{ fontSize: '1.2rem', color: '#ec4899' }} aria-hidden="true" />
              <strong>ISSMIGA</strong>
            </div>
            <span>BTS, Licence, Master · <i className="bx bx-laptop" aria-hidden="true" /> Laptop offert</span>
          </button>
        </div>

        {institution === 'issmiga' ? (
          <div className={styles.offerBanner} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <i className="bx bx-gift" style={{ fontSize: '1.4rem', color: '#fbcfe8', flexShrink: 0 }} aria-hidden="true" />
            <div>
              <strong>Offre spéciale ISSMIGA :</strong> Un Étudiant inscrit = Un Laptop offert gratuitement ! Début des cours : 05 Octobre 2026.
            </div>
          </div>
        ) : null}

        {institution === 'cfp' ? (
          <div className={styles.offerBannerCfp} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <i className="bx bx-certification" style={{ fontSize: '1.4rem', color: '#fed7aa', flexShrink: 0 }} aria-hidden="true" />
            <div>
              <strong>CFP NO LIMIT :</strong> Centre de Formation Professionnelle agréé MINEFOP. Qualification rapide et insertion directe.
            </div>
          </div>
        ) : null}

        <div className={styles.layout}>
          <Tabs
            label="Pôles de formation"
            tabs={poles.map((pole) => ({
              id: pole.id,
              label: pole.name,
              content: (
                <div>
                  <p>{current?.description}</p>
                  {visible.length === 0 ? (
                    <p className={styles.empty}>
                      Aucune formation disponible dans ce pôle pour l’établissement sélectionné.
                    </p>
                  ) : (
                    <div className={styles.list}>
                      {visible.map((formation) => (
                        <Link
                          key={formation.slug}
                          className={styles.row}
                          to={`/formations/${formation.slug}`}
                        >
                          <div>
                            <strong>{formation.title}</strong>
                          </div>
                          <span className={styles.meta}>
                            <Badge variant={formation.institution === 'issmiga' ? 'primary' : 'outline'}>
                              {formation.institution === 'issmiga' ? 'ISSMIGA' : 'CFP NO LIMIT'}
                            </Badge>
                            {' '}
                            <Badge>{formatDiploma(formation.diploma)}</Badge>
                            {' · '}
                            {formation.duration}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className={styles.more}>
                    <LinkButton to="/formations" variant="outline">
                      Voir toutes les formations dans le catalogue complet
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

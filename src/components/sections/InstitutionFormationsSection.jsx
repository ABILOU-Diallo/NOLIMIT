import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LinkButton } from '../ui/LinkButton'
import styles from './InstitutionFormationsSection.module.css'

export function InstitutionFormationsSection({
  formations = [],
  institution = 'issmiga',
  primaryColor = '#ec4899',
  diplomaFilters = ['Tous', 'BTS', 'Licence', 'Master']
}) {
  const [selectedFilter, setSelectedFilter] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return formations.filter((f) => {
      // 1. Filtrer par diplôme
      if (selectedFilter !== 'Tous') {
        const d = (f.diploma || '').toLowerCase()
        const filterLower = selectedFilter.toLowerCase()
        if (filterLower === 'bts' && !d.includes('bts')) return false
        if (filterLower === 'licence' && !d.includes('licence')) return false
        if (filterLower === 'master' && !d.includes('master')) return false
        if (filterLower === 'cqp' && !d.includes('cqp')) return false
        if (filterLower === 'dqp' && !d.includes('dqp')) return false
      }

      // 2. Recherche par mot-clé
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = f.title.toLowerCase().includes(q)
        const matchesDesc = (f.description || f.excerpt || '').toLowerCase().includes(q)
        const matchesSkills = (f.skills || []).some(s => s.toLowerCase().includes(q))
        const matchesOutlets = (f.outlets || []).some(o => o.toLowerCase().includes(q))
        return matchesTitle || matchesDesc || matchesSkills || matchesOutlets
      }

      return true
    })
  }, [formations, selectedFilter, searchQuery])

  return (
    <div className={styles.container}>
      {/* Barre de recherche et filtres */}
      <div className={styles.controlsBar}>
        <div className={styles.filterTabs} role="tablist" aria-label="Filtrer par diplôme">
          {diplomaFilters.map((df) => (
            <button
              key={df}
              type="button"
              className={`${styles.tabBtn} ${selectedFilter === df ? styles.tabBtnActive : ''}`}
              onClick={() => setSelectedFilter(df)}
              role="tab"
              aria-selected={selectedFilter === df}
            >
              {df}
            </button>
          ))}

          {/* Bouton Formation à la carte - Spécifique au CFP */}
          {institution === 'cfp' && (
            <Link
              to="/formations-a-la-carte"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tabBtn}
              style={{
                background: '#ea580c',
                color: '#ffffff',
                borderColor: '#ea580c',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                fontWeight: '700',
                padding: '0.45rem 1.2rem'
              }}
            >
              <i className="bx bx-calendar-star" style={{ fontSize: '1.1rem' }} />
              Formation à la carte (03, 06 et 09 mois)
            </Link>
          )}
        </div>

        <div className={styles.searchBox}>
          <i className="bx bx-search" aria-hidden="true" />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <i className="bx bx-folder-open" aria-hidden="true" />
          <p>Aucune formation trouvée.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((f) => {
            const diplomaUpper = (f.diploma || '').toUpperCase()
            return (
              <article key={f.id || f.slug} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.badgesRow}>
                    <span
                      className={styles.diplomaBadge}
                      style={{ background: institution === 'issmiga' ? 'var(--color-navy-900)' : '#ea580c' }}
                    >
                      {diplomaUpper}
                    </span>
                    <span className={styles.durationBadge}>
                      <i className="bx bx-time-five" />
                      {f.duration || '1 an'}
                    </span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.description}>{f.description || f.excerpt}</p>

                <div className={styles.cardFooter}>
                  <Link
                    to={`/formations/${f.slug}`}
                    style={{ fontSize: '0.88rem', fontWeight: 650, color: 'var(--color-navy-900)', textDecoration: 'none' }}
                  >
                    Détails
                  </Link>

                  <LinkButton
                    to={`/preinscription?formation=${f.slug}`}
                    variant="primary"
                    style={{ background: institution === 'issmiga' ? 'var(--color-magenta-600)' : '#ea580c', fontSize: '0.88rem' }}
                  >
                    S'inscrire
                  </LinkButton>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

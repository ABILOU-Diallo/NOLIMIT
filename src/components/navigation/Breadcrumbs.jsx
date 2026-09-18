import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export function Breadcrumbs({ items, inverted = false }) {
  return (
    <nav aria-label="Fil d’Ariane">
      <ol className={[styles.crumbs, inverted ? styles.light : ''].join(' ')}>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.to || item.label}>
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
              {last ? null : (
                <span className={styles.sep} aria-hidden="true">
                  {' '}
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

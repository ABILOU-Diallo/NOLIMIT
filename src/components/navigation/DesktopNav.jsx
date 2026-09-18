import { NavLink } from 'react-router-dom'
import { mainNav } from '../../data/nav'
import styles from './DesktopNav.module.css'

export function DesktopNav() {
  return (
    <nav className={styles.list} aria-label="Navigation principale">
      {mainNav.map((item) => (
        <NavLink key={item.to} to={item.to} className={styles.link}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

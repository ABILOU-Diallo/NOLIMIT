import { Container } from '../ui/Container'
import { Breadcrumbs } from '../navigation/Breadcrumbs'
import styles from './PageHero.module.css'

export function PageHero({ title, lede, crumbs }) {
  return (
    <header className={styles.hero}>
      <Container>
        {crumbs ? <Breadcrumbs items={crumbs} inverted /> : null}
        <h1>{title}</h1>
        {lede ? <p>{lede}</p> : null}
      </Container>
    </header>
  )
}

export function PageBody({ children }) {
  return (
    <div className={styles.page}>
      <Container>{children}</Container>
    </div>
  )
}

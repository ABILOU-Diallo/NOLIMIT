import { Container } from '../ui/Container'
import { Breadcrumbs } from '../navigation/Breadcrumbs'
import styles from './PageHero.module.css'

export function PageHero({ title, lede, crumbs, logo, logoAlt }) {
  return (
    <header className={styles.hero}>
      <Container>
        {crumbs ? <Breadcrumbs items={crumbs} inverted /> : null}
        <div className={styles.headerTitleWrap}>
          {logo ? (
            <img
              src={logo}
              alt={logoAlt || `Logo ${title}`}
              className={styles.headerLogo}
              width="64"
              height="64"
            />
          ) : null}
          <h1>{title}</h1>
        </div>
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

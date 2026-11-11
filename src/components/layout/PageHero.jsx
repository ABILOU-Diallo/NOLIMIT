import { Container } from '../ui/Container'
import { Breadcrumbs } from '../navigation/Breadcrumbs'
import styles from './PageHero.module.css'

export function PageHero({ title, lede, crumbs, logo, logoAlt, sideImage, sideImageAlt }) {
  return (
    <header className={styles.hero}>
      <Container>
        {crumbs ? <Breadcrumbs items={crumbs} inverted /> : null}
        <div className={`${styles.headerTitleWrap}${sideImage ? ` ${styles.headerTitleWithImage}` : ''}`}>
          <div className={styles.headerTitle}>
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
          {sideImage ? (
            <img
              src={sideImage}
              alt={sideImageAlt || ''}
              className={styles.headerSideImage}
              width="1316"
              height="768"
            />
          ) : null}
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

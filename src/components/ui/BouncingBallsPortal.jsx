import { Link } from 'react-router-dom'
import cfpLogo from '../../assets/cfp.jpg'
import issmigaLogo from '../../assets/issmiga.jpg'
import styles from './BouncingBallsPortal.module.css'

export function BouncingBallsPortal() {
  return (
    <div className={styles.portalSection} role="region" aria-label="Portail d'accès aux établissements">
      <div className={styles.portalHeading}>
        <div className={styles.portalBadge}>
          <i className="bx bx-pointer" aria-hidden="true" />
          <span>Accès Direct par Établissement</span>
        </div>
        <h2 className={styles.portalTitle}>
          Cliquez sur un logo pour explorer son univers dédié
        </h2>
      </div>

      <div className={styles.ballsGrid}>
        {/* Balle 1 : CFP NO LIMIT */}
        <Link
          to="/le-groupe/cfp"
          className={styles.ballCard}
          title="Accéder uniquement aux formations et informations du CFP NO LIMIT"
          aria-label="Accéder uniquement aux pages et formations du CFP NO LIMIT"
        >
          <div className={styles.stage}>
            <div className={`${styles.bouncingBall} ${styles.ballCfp}`}>
              <img
                src={cfpLogo}
                alt="Logo CFP NO LIMIT - Formations pratiques et qualifiantes"
                className={styles.ballImage}
                width="90"
                height="90"
                loading="eager"
              />
              <div className={styles.ballGloss} />
            </div>
            <div className={`${styles.shadow} ${styles.shadowCfp}`} />
          </div>

          <div className={styles.ballInfo}>
            <h3 className={styles.ballName}>
              CFP NO LIMIT
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </h3>
            <p className={styles.ballSub}>
              CQP & DQP (1 an) · Attestation 3, 6 et 9 mois · Agréé MINEFOP
            </p>
            <span className={styles.ballAction}>
              Voir uniquement le CFP <i className="bx bx-chevron-right" aria-hidden="true" />
            </span>
          </div>
        </Link>

        {/* Balle 2 : ISSMIGA */}
        <Link
          to="/le-groupe/issmiga"
          className={styles.ballCard}
          title="Accéder uniquement aux formations et informations de l'ISSMIGA"
          aria-label="Accéder uniquement aux pages et formations de l'ISSMIGA"
        >
          <div className={styles.stage}>
            <div className={`${styles.bouncingBall} ${styles.ballIssmiga}`}>
              <img
                src={issmigaLogo}
                alt="Logo ISSMIGA - Institut Supérieur"
                className={styles.ballImage}
                width="90"
                height="90"
                loading="eager"
              />
              <div className={styles.ballGloss} />
            </div>
            <div className={`${styles.shadow} ${styles.shadowIssmiga}`} />
          </div>

          <div className={styles.ballInfo}>
            <h3 className={styles.ballName}>
              ISSMIGA
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </h3>
            <p className={styles.ballSub}>
              Enseignement Supérieur · BTS, Licence, Master · Agréé MINESUP
            </p>
            <span className={styles.ballAction}>
              Voir uniquement ISSMIGA <i className="bx bx-chevron-right" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

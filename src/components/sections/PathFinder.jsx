import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './PathFinder.module.css'

const paths = [
  {
    to: '/admissions',
    title: 'Je sors du lycée',
    text: 'ISSMIGA OU CFP ?',
  },
  {
    to: '/langues',
    title: 'Je veux une langue',
    text: 'Anglais, Allemand ou français.',
  },
  {
    to: '/formations',
    title: 'Je prépare un métier',
    text: 'Immigration ou formation emploi.',
  },
]

export function PathFinder() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="02 — Trouver son parcours"
          title="Trois portes d’entrée. Une seule question : Laquelle choisir ?"
          lede="Identifiez votre profil pour être guidé vers le parcours le plus adapté à votre projet."
        />
        <div className={styles.grid}>
          {paths.map((path) => (
            <Link key={path.to} to={path.to} className={styles.card}>
              <strong>{path.title}</strong>
              <p>{path.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

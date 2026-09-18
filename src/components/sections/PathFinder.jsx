import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './PathFinder.module.css'

const paths = [
  {
    to: '/admissions',
    title: 'Je sors du lycée',
    text: 'Comprendre CQP, DQP, le calendrier et les documents avant de s’inscrire.',
  },
  {
    to: '/langues',
    title: 'Je veux une langue',
    text: 'Allemand, anglais ou français, de A1 à C2, avec certifications.',
  },
  {
    to: '/formations',
    title: 'Je prépare un métier',
    text: 'Parcourir les cinq pôles et ouvrir une fiche filière.',
  },
]

export function PathFinder() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="04 — Trouver son parcours"
          title="Par où commencer, selon votre situation."
          lede="Trois portes d’entrée. Une seule question : ce que vous venez chercher."
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

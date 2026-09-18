import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Avatar } from '../ui/Avatar'
import styles from './TestimonialsSection.module.css'

export function TestimonialsSection({ items = [] }) {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          kicker="10 — Témoignages"
          title="La parole des personnes formées, lorsqu’elle est disponible."
        />
        {items.length === 0 ? (
          <p className={styles.empty}>
            {/* TODO: contenu réel à fournir */}
            Les témoignages validés seront publiés ici. Aucun avis n’est inventé.
          </p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Avatar name={item.author_name} />
                <blockquote>
                  <p>{item.quote}</p>
                  <footer>
                    {item.author_name}
                    {item.author_role ? ` · ${item.author_role}` : ''}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}

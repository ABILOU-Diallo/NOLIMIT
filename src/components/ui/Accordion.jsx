import { useId, useState } from 'react'
import styles from './Accordion.module.css'

export function Accordion({ items }) {
  const baseId = useId()
  const [open, setOpen] = useState(items[0]?.id ?? null)

  return (
    <div>
      {items.map((item) => {
        const isOpen = open === item.id
        const panelId = `${baseId}-${item.id}`
        return (
          <div key={item.id} className={styles.item}>
            <h3>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                {item.title}
                <span className={styles.icon} aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div id={panelId} className={styles.panel}>
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

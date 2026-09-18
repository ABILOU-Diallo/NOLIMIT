import { useId, useState } from 'react'
import styles from './Tabs.module.css'

export function Tabs({ tabs, defaultId, onChange, label = 'Sections' }) {
  const baseId = useId()
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id)

  function select(id) {
    setActive(id)
    onChange?.(id)
  }

  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]

  if (!current) return null

  return (
    <div>
      <div className={styles.tabs} role="tablist" aria-label={label}>
        {tabs.map((tab) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}`}
              className={styles.tab}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${current.id}`}
        className={styles.panel}
      >
        {current.content}
      </div>
    </div>
  )
}

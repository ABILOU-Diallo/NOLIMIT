import styles from './Container.module.css'

export function Container({ narrow = false, className = '', children, as: Tag = 'div' }) {
  return (
    <Tag
      className={[styles.container, narrow ? styles.narrow : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}

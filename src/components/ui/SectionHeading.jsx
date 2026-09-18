import styles from './SectionHeading.module.css'

export function SectionHeading({
  kicker,
  title,
  lede,
  as: Tag = 'h2',
  align = 'left',
  onDark = false,
}) {
  return (
    <header
      className={[
        styles.heading,
        align === 'center' ? styles.center : '',
        onDark ? styles.onDark : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <Tag className={styles.title}>{title}</Tag>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </header>
  )
}

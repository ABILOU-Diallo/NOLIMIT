export function WhatsAppIcon({ className, size = 22 }) {
  return (
    <i
      className={`bx bxl-whatsapp ${className || ''}`}
      style={{ fontSize: typeof size === 'number' ? `${size}px` : size, display: 'inline-flex', alignItems: 'center' }}
      aria-hidden="true"
    />
  )
}

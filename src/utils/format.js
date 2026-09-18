export function whatsappUrl(e164, message) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${e164}?text=${text}`
}

export function formatDiploma(code) {
  return String(code || '').toUpperCase()
}

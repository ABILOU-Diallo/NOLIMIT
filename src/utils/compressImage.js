const MAX_IMAGE_BYTES = 300 * 1024
const MAX_IMAGE_DIMENSION = 1600

function canvasToBlob(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Impossible de compresser cette image.'))),
      'image/webp',
      quality,
    )
  })
}

export async function compressImage(file) {
  if (!file.type.startsWith('image/') || file.size <= MAX_IMAGE_BYTES) return file

  const bitmap = await createImageBitmap(file)
  try {
    let scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height))
    let quality = 0.82

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(bitmap.width * scale))
      canvas.height = Math.max(1, Math.round(bitmap.height * scale))
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Le navigateur ne peut pas traiter cette image.')
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

      const blob = await canvasToBlob(canvas, quality)
      if (blob.size <= MAX_IMAGE_BYTES) {
        const name = file.name.replace(/\.[^.]+$/, '') || 'image'
        return new File([blob], `${name}.webp`, {
          type: 'image/webp',
          lastModified: Date.now(),
        })
      }

      if (attempt % 2 === 0) quality = Math.max(0.55, quality - 0.1)
      else scale *= 0.8
    }

    throw new Error('Cette image reste trop volumineuse après compression. Choisissez une image plus légère.')
  } finally {
    bitmap.close()
  }
}

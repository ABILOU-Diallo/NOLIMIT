import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { useAuth } from '../../hooks/useAuth'
import { getSiteSettings, saveSiteSettings } from '../../services/siteSettingsService'

export function AdminParametresPage() {
  const { isSuperAdmin } = useAuth()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    getSiteSettings().then(setForm).catch((err) => setError(err.message))
  }, [])

  if (!isSuperAdmin) {
    return <Navigate to="/admin" replace />
  }

  if (!form) return <Loader label="Chargement des paramètres" />

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      await saveSiteSettings(form)
      setSuccess('Paramètres enregistrés.')
      setError('')
    } catch (err) {
      setError(err.message || 'La sauvegarde a échoué.')
      setSuccess('')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ color: '#64748b', marginTop: 0 }}>
        Ces informations sont modifiables par les super administrateurs. Elles alimentent les coordonnées du site.
      </p>
      {error ? <p className="admin-alert error" role="alert">{error}</p> : null}
      {success ? <p className="admin-alert success" role="status">{success}</p> : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <section className="admin-panel">
          <h3 style={{ marginTop: 0 }}>Établissement</h3>
          <Input id="establishment_name" name="establishment_name" label="Nom" value={form.establishment_name} onChange={handleChange} />
          <Input id="contact_email" name="contact_email" type="email" label="E-mail de contact" value={form.contact_email} onChange={handleChange} />
          <Input id="phone" name="phone" label="Téléphone" value={form.phone} onChange={handleChange} />
          <Input id="address" name="address" label="Adresse" value={form.address} onChange={handleChange} />
        </section>

        <section className="admin-panel">
          <h3 style={{ marginTop: 0 }}>Réseaux sociaux</h3>
          <Input id="facebook" name="facebook" label="Facebook" value={form.facebook} onChange={handleChange} />
          <Input id="instagram" name="instagram" label="Instagram" value={form.instagram} onChange={handleChange} />
          <Input id="linkedin" name="linkedin" label="LinkedIn" value={form.linkedin} onChange={handleChange} />
          <Input id="youtube" name="youtube" label="YouTube" value={form.youtube} onChange={handleChange} />
          <Input id="whatsapp" name="whatsapp" label="WhatsApp" value={form.whatsapp} onChange={handleChange} />
        </section>

        <section className="admin-panel">
          <h3 style={{ marginTop: 0 }}>Admissions</h3>
          <Input id="academic_year" name="academic_year" label="Année académique" value={form.academic_year} onChange={handleChange} />
          <Input id="issmiga_start" name="issmiga_start" type="date" label="Rentrée ISSMIGA" value={form.issmiga_start} onChange={handleChange} />
          <Input id="cfp_start" name="cfp_start" type="date" label="Rentrée CFP" value={form.cfp_start} onChange={handleChange} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
            <input type="checkbox" name="preinscriptions_open" checked={Boolean(form.preinscriptions_open)} onChange={handleChange} />
            Préinscriptions ouvertes
          </label>
        </section>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <Button type="submit" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer les paramètres'}</Button>
      </div>
    </form>
  )
}

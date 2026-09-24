import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { signUp } from '../../services/authService'
import styles from './AuthPage.module.css'

export function RegisterPage() {
  const navigate = useNavigate()
  const { session, ready } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!ready) return null
  if (session) return <Navigate to="/compte" replace />

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await signUp(form.email, form.password, form.fullName)
    if (result.error) {
      setError(result.error.message || 'Impossible de créer le compte.')
      setLoading(false)
      return
    }

    navigate('/compte', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1 className={styles.title}>Inscription</h1>
        <p className={styles.subtitle}>Créez votre compte étudiant pour accéder à votre espace personnel.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input id="fullName" label="Nom complet" name="fullName" value={form.fullName} onChange={handleChange} required />
          <Input id="email" label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input id="password" label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} required />
          {error ? <p role="alert" className={styles.error}>{error}</p> : null}
          <Button type="submit" full disabled={loading}>
            {loading ? 'Création…' : 'Créer mon compte'}
          </Button>
        </form>

        <p className={styles.meta}>
          Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

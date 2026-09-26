import { useState } from 'react'
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { signIn, getProfile } from '../../services/authService'
import styles from './AuthPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, ready, isAdmin: alreadyAdmin } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirection automatique si déjà connecté
  if (ready && session) {
    if (alreadyAdmin) return <Navigate to="/admin" replace />
    return <Navigate to="/compte" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: authError } = await signIn(form.email, form.password)

      if (authError) {
        setError(authError.message || 'Identifiants incorrects.')
        setLoading(false)
        return
      }

      // Récupérer le rôle pour la redirection immédiate
      const profile = await getProfile(data.user.id)
      const role = profile?.role || 'student'
      const isPrivileged = ['admin', 'super_admin', 'owner'].includes(role)

      // Rediriger vers la page demandée ou le dashboard par défaut
      const defaultNext = isPrivileged ? '/admin' : '/compte'
      const next = location.state?.from || defaultNext

      navigate(next, { replace: true })
    } catch (err) {
      setError('Une erreur technique est survenue.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.subtitle}>Accédez à votre espace ou à l’administration.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input id="email" label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="exemple@mail.com" />
          <Input id="password" label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />

          {error ? <p role="alert" className={styles.error} style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>⚠️ {error}</p> : null}

          <Button type="submit" full disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </form>

        <p className={styles.meta}>
          Pas encore inscrit ? <Link to="/inscription">Créer un compte étudiant</Link>
        </p>
      </div>
    </div>
  )
}

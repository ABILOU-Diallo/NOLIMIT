import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../../hooks/auth-context'
import {
  getProfile,
  getSession,
  onAuthChange,
  signOut as signOutService,
} from '../../services/authService'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true

    getSession().then(async (current) => {
      if (!mounted) return
      setSession(current)
      if (current?.user) {
        const nextProfile = await getProfile(current.user.id)
        if (mounted) setProfile(nextProfile)
      }
      setReady(true)
    })

    const unsubscribe = onAuthChange(async (next) => {
      setSession(next)
      if (next?.user) {
        setProfile(await getProfile(next.user.id))
      } else {
        setProfile(null)
      }
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      ready,
      session,
      profile,
      role: profile?.role ?? 'visitor',
      isAdmin: profile?.role === 'admin',
      signOut: signOutService,
    }),
    [ready, session, profile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

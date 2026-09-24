import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../../hooks/auth-context'
import {
  getProfile,
  getSession,
  onAuthChange,
  signOut as signOutService,
} from '../../services/authService'

const OWNER_EMAIL = 'nicodevnico@gmail.com'

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

  const value = useMemo(() => {
    const role = profile?.role ?? 'visitor'
    const email = session?.user?.email ?? ''

    // Hiérarchie : owner > super_admin > admin > student > visitor
    const isOwner = role === 'owner' || email.toLowerCase() === OWNER_EMAIL
    const isSuperAdmin = isOwner || role === 'super_admin'
    const isAdmin = isSuperAdmin || role === 'admin'

    return {
      ready,
      session,
      profile,
      role,
      isAdmin,
      isSuperAdmin,
      isOwner,
      email,
      signOut: signOutService,
    }
  }, [ready, session, profile])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader } from '../../components/ui/Loader'
import { useAuth } from '../../hooks/useAuth'
import { useLockBody } from '../../hooks/useLockBody'
import '../../styles/admin.css'

const SIDEBAR_KEY = 'issmiga_admin_sidebar_collapsed'

const PAGE_TITLES = {
  '/admin': 'Tableau de bord',
  '/admin/utilisateurs': 'Utilisateurs',
  '/admin/preinscriptions': 'Préinscriptions',
  '/admin/actualites': 'Actualités',
  '/admin/formations': 'Formations',
  '/admin/contacts': 'Contacts',
  '/admin/temoignages': 'Témoignages',
  '/admin/commentaires': 'Commentaires',
  '/admin/parametres': 'Paramètres du site',
  '/admin/systeme': 'Système & sécurité',
}

export function AdminLayout() {
  const { ready, isAdmin, isSuperAdmin, isOwner, profile, email, signOut } = useAuth()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_KEY) === '1'
    } catch {
      return false
    }
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useLockBody(mobileOpen)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0')
    } catch {
      // ignore
    }
  }, [collapsed])

  if (!ready) {
    return <Loader label="Chargement de l'espace d'administration" />
  }

  if (!isAdmin) {
    return <Navigate to="/compte" replace />
  }

  const baseNav = [
    { to: '/admin', label: 'Tableau de bord', icon: 'bx-home-alt-2', end: true },
    { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: 'bx-group' },
    { to: '/admin/preinscriptions', label: 'Préinscriptions', icon: 'bx-clipboard' },
    { to: '/admin/actualites', label: 'Actualités', icon: 'bx-news' },
    { to: '/admin/formations', label: 'Formations', icon: 'bx-book-bookmark' },
    { to: '/admin/contacts', label: 'Contacts', icon: 'bx-envelope' },
    { to: '/admin/temoignages', label: 'Témoignages', icon: 'bx-message-rounded-dots' },
    { to: '/admin/commentaires', label: 'Commentaires', icon: 'bx-chat' },
  ]

  const superAdminNav = isSuperAdmin
    ? [{ to: '/admin/parametres', label: 'Paramètres', icon: 'bx-cog' }]
    : []

  const ownerNav = isOwner
    ? [{ to: '/admin/systeme', label: 'Système', icon: 'bx-shield-quarter' }]
    : []

  const allNav = [...baseNav, ...superAdminNav, ...ownerNav]
  const pageTitle = PAGE_TITLES[location.pathname] || 'Administration'

  const roleInfo = isOwner
    ? { label: 'Propriétaire', color: '#f59e0b', bg: '#fef3c7', icon: 'bx-crown' }
    : isSuperAdmin
      ? { label: 'Super Admin', color: '#7c3aed', bg: '#ede9fe', icon: 'bx-bolt-circle' }
      : { label: 'Administrateur', color: '#3b82f6', bg: '#dbeafe', icon: 'bx-shield' }

  const initials = (profile?.full_name || email || 'A')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  const sidebarClass = [
    'admin-sidebar',
    collapsed ? 'collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="admin-shell">
      <div
        className={`admin-overlay${mobileOpen ? ' visible' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside className={sidebarClass} aria-label="Menu d'administration">
        <div className="admin-sidebar-inner">
          <div className="admin-logo">
            <div className="admin-logo-icon">IN</div>
            <div className="admin-logo-text">
              <div className="admin-logo-title">ISSMIGA Admin</div>
              <div className="admin-logo-sub">Groupe NO LIMIT</div>
            </div>
          </div>

          <div className="admin-role-badge" style={{ background: roleInfo.bg, color: roleInfo.color }}>
            <i className={`bx ${roleInfo.icon}`} aria-hidden />
            <span className="admin-role-badge-label">{roleInfo.label}</span>
          </div>

          <div className="admin-nav-section">Navigation</div>
          <nav className="admin-nav">
            {allNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                data-label={item.label}
                className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
              >
                <i className={`bx ${item.icon} nav-icon`} aria-hidden />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="admin-sidebar-toggle">
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
          >
            <i className={`bx ${collapsed ? 'bx-chevron-right' : 'bx-chevron-left'}`} />
          </button>
        </div>

        <div className="admin-sidebar-user">
          <div className="admin-sidebar-user-avatar">{initials || 'A'}</div>
          <div className="admin-sidebar-user-info">
            <div className="admin-sidebar-user-name">{profile?.full_name || 'Administrateur'}</div>
            <div className="admin-sidebar-user-email">{email}</div>
          </div>
          <button type="button" className="admin-signout-btn" onClick={signOut} aria-label="Déconnexion">
            <i className="bx bx-log-out" />
          </button>
        </div>
      </aside>

      <div className={`admin-content${collapsed ? ' sidebar-collapsed' : ''}`}>
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <i className="bx bx-menu" />
            </button>
            <div>
              <div className="admin-page-breadcrumb">Espace administration</div>
              <h1 className="admin-page-title">{pageTitle}</h1>
            </div>
          </div>
          <div className="admin-topbar-right">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                borderRadius: '999px',
                background: roleInfo.bg,
                color: roleInfo.color,
                fontWeight: 700,
                fontSize: '0.78rem',
              }}
            >
              <i className={`bx ${roleInfo.icon}`} aria-hidden />
              {roleInfo.label}
            </span>
          </div>
        </header>

        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

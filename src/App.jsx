import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { Loader } from './components/ui/Loader'
import { HomePage } from './pages/HomePage'

const GroupePage = lazy(() => import('./pages/GroupePage').then((m) => ({ default: m.GroupePage })))
const PromoteurPage = lazy(() =>
  import('./pages/PromoteurPage').then((m) => ({ default: m.PromoteurPage })),
)
const IssmigaPage = lazy(() =>
  import('./pages/IssmigaPage').then((m) => ({ default: m.IssmigaPage })),
)
const CfpPage = lazy(() => import('./pages/CfpPage').then((m) => ({ default: m.CfpPage })))
const FormationsPage = lazy(() =>
  import('./pages/FormationsPage').then((m) => ({ default: m.FormationsPage })),
)
const FormationDetailPage = lazy(() =>
  import('./pages/FormationDetailPage').then((m) => ({ default: m.FormationDetailPage })),
)
const LanguesPage = lazy(() =>
  import('./pages/LanguesPage').then((m) => ({ default: m.LanguesPage })),
)
const EmployabilitePage = lazy(() =>
  import('./pages/EmployabilitePage').then((m) => ({ default: m.EmployabilitePage })),
)
const AdmissionsPage = lazy(() =>
  import('./pages/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage })),
)
const ActualitesPage = lazy(() =>
  import('./pages/ActualitesPage').then((m) => ({ default: m.ActualitesPage })),
)
const ActualiteDetailPage = lazy(() =>
  import('./pages/ActualiteDetailPage').then((m) => ({ default: m.ActualiteDetailPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const PreinscriptionPage = lazy(() =>
  import('./pages/PreinscriptionPage').then((m) => ({ default: m.PreinscriptionPage })),
)
const MentionsPage = lazy(() =>
  import('./pages/MentionsPage').then((m) => ({ default: m.MentionsPage })),
)
const ConfidentialitePage = lazy(() =>
  import('./pages/ConfidentialitePage').then((m) => ({ default: m.ConfidentialitePage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() =>
  import('./pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
const AccountPage = lazy(() => import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })))
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
)
const AdminDashboardPage = lazy(() =>
  import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })),
)
const AdminUsersPage = lazy(() =>
  import('./pages/admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })),
)
const AdminPreinscriptionsPage = lazy(() =>
  import('./pages/admin/AdminPreinscriptionsPage').then((m) => ({ default: m.AdminPreinscriptionsPage })),
)
const AdminActualitesPage = lazy(() =>
  import('./pages/admin/AdminActualitesPage').then((m) => ({ default: m.AdminActualitesPage })),
)

const AdminFormationsPage = lazy(() =>
  import('./pages/admin/AdminFormationsPage').then((m) => ({ default: m.AdminFormationsPage })),
)
const AdminContactsPage = lazy(() =>
  import('./pages/admin/AdminContactsPage').then((m) => ({ default: m.AdminContactsPage })),
)
const AdminTestimonialsPage = lazy(() =>
  import('./pages/admin/AdminTestimonialsPage').then((m) => ({ default: m.AdminTestimonialsPage })),
)
const AdminParametresPage = lazy(() =>
  import('./pages/admin/AdminParametresPage').then((m) => ({ default: m.AdminParametresPage })),
)
const AdminSystemePage = lazy(() =>
  import('./pages/admin/AdminSystemePage').then((m) => ({ default: m.AdminSystemePage })),
)
const AdminCommentsPage = lazy(() =>
  import('./pages/admin/AdminCommentsPage').then((m) => ({ default: m.AdminCommentsPage })),
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader label="Chargement de la page" />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="connexion" element={<LoginPage />} />
            <Route path="inscription" element={<RegisterPage />} />
            <Route path="compte" element={<AccountPage />} />
            <Route path="le-groupe">
              <Route index element={<GroupePage />} />
              <Route path="promoteur" element={<PromoteurPage />} />
              <Route path="issmiga" element={<IssmigaPage />} />
              <Route path="cfp" element={<CfpPage />} />
            </Route>
            <Route path="formations">
              <Route index element={<FormationsPage />} />
              <Route path=":slug" element={<FormationDetailPage />} />
            </Route>
            <Route path="langues" element={<LanguesPage />} />
            <Route path="employabilite" element={<EmployabilitePage />} />
            <Route path="admissions" element={<AdmissionsPage />} />
            <Route path="actualites">
              <Route index element={<ActualitesPage />} />
              <Route path=":slug" element={<ActualiteDetailPage />} />
            </Route>
            <Route path="contact" element={<ContactPage />} />
            <Route path="preinscription" element={<PreinscriptionPage />} />
            <Route path="mentions-legales" element={<MentionsPage />} />
            <Route path="politique-confidentialite" element={<ConfidentialitePage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="admin/utilisateurs" element={<AdminUsersPage />} />
              <Route path="admin/preinscriptions" element={<AdminPreinscriptionsPage />} />
              <Route path="admin/actualites" element={<AdminActualitesPage />} />
              <Route path="admin/formations" element={<AdminFormationsPage />} />
              <Route path="admin/contacts" element={<AdminContactsPage />} />
              <Route path="admin/temoignages" element={<AdminTestimonialsPage />} />
              <Route path="admin/commentaires" element={<AdminCommentsPage />} />
              <Route path="admin/parametres" element={<AdminParametresPage />} />
              <Route path="admin/systeme" element={<AdminSystemePage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

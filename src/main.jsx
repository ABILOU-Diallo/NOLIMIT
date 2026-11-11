import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './components/layout/AuthProvider'
import { ToastProvider } from './components/layout/ToastProvider'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import App from './App.jsx'
import 'boxicons/css/boxicons.min.css'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

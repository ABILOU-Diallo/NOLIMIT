import { Component } from 'react'
import { Button } from '../ui/Button'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Erreur inattendue dans l’application :', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" style={{ maxWidth: '40rem', margin: '5rem auto', padding: '2rem', textAlign: 'center' }}>
          <h1>Une erreur est survenue</h1>
          <p>La page n’a pas pu être affichée. Rechargez-la pour réessayer.</p>
          <Button onClick={() => window.location.reload()}>Recharger la page</Button>
        </main>
      )
    }

    return this.props.children
  }
}

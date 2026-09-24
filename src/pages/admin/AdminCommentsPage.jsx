import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { blockComment, deleteComment, getAllComments, unblockComment } from '../../services/commentService'

export function AdminCommentsPage() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function load() {
    try {
      setLoading(true)
      setItems(await getAllComments())
      setError('')
    } catch (err) {
      setError(err.message || 'Impossible de charger les commentaires.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'blocked' && item.is_blocked) ||
        (filter === 'visible' && !item.is_blocked)
      const haystack = `${item.author_name ?? ''} ${item.content ?? ''} ${item.actualites?.title ?? ''}`.toLowerCase()
      return matchesFilter && haystack.includes(query.trim().toLowerCase())
    })
  }, [filter, items, query])

  async function handleBlock(id) {
    const reason = window.prompt('Motif du blocage', 'Contenu inapproprié')
    if (reason == null) return
    try {
      await blockComment(id, reason || 'Contenu inapproprié')
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, is_blocked: true, blocked_reason: reason } : item,
        ),
      )
      setSuccess('Commentaire bloqué.')
    } catch (err) {
      setError(err.message || 'Le blocage a échoué.')
    }
  }

  async function handleUnblock(id) {
    try {
      await unblockComment(id)
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, is_blocked: false, blocked_reason: null } : item)),
      )
      setSuccess('Commentaire rétabli.')
    } catch (err) {
      setError(err.message || 'Le rétablissement a échoué.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer définitivement ce commentaire ?')) return
    try {
      await deleteComment(id)
      setItems((current) => current.filter((item) => item.id !== id))
      setSuccess('Commentaire supprimé.')
    } catch (err) {
      setError(err.message || 'La suppression a échoué.')
    }
  }

  if (loading) return <Loader label="Chargement des commentaires" />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <p style={{ margin: 0, color: '#64748b' }}>
          Modérez les commentaires publics. Un commentaire bloqué disparaît du site mais reste consultable ici.
        </p>
        <Button type="button" variant="outline" onClick={load}>Actualiser</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <Input id="comment-search" label="Recherche" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Auteur, contenu, article" />
        <div>
          <label htmlFor="comment-filter" style={{ display: 'block', marginBottom: '0.4rem' }}>Filtre</label>
          <select
            id="comment-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            style={{ width: '100%', padding: '0.75rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          >
            <option value="all">Tous</option>
            <option value="visible">Visibles</option>
            <option value="blocked">Bloqués</option>
          </select>
        </div>
      </div>

      {error ? <p className="admin-alert error" role="alert">{error}</p> : null}
      {success ? <p className="admin-alert success" role="status">{success}</p> : null}

      <div className="admin-table-wrap">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Auteur</th>
                <th>Commentaire</th>
                <th>Article</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                    Aucun commentaire.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className={item.is_blocked ? 'admin-comment-blocked' : ''}>
                    <td>
                      <strong>{item.author_name}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{item.author_email || '—'}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                        {item.created_at ? new Date(item.created_at).toLocaleString('fr-FR') : ''}
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{item.content}</td>
                    <td>{item.actualites?.title || item.article_id || '—'}</td>
                    <td>
                      {item.is_blocked ? (
                        <span style={{ color: '#b91c1c', fontWeight: 700 }}>
                          Bloqué{item.blocked_reason ? ` · ${item.blocked_reason}` : ''}
                        </span>
                      ) : (
                        <span style={{ color: '#166534', fontWeight: 700 }}>Visible</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {item.is_blocked ? (
                          <Button type="button" variant="outline" onClick={() => handleUnblock(item.id)}>Rétablir</Button>
                        ) : (
                          <Button type="button" variant="outline" onClick={() => handleBlock(item.id)}>Bloquer</Button>
                        )}
                        <Button type="button" variant="secondary" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

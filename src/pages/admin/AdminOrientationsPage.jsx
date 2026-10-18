import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/ui/Loader';
import { Button } from '../../components/ui/Button';
import { getAllRequests, updateRequestStatus, deleteRequest } from '../../services/orientationService';

export function AdminOrientationsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getAllRequests();
      setRequests(data);
    } catch (err) {
      setError('Erreur lors du chargement des demandes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRequestStatus(id, newStatus);
      loadRequests();
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette demande ?')) return;
    try {
      await deleteRequest(id);
      loadRequests();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  if (loading) return <Loader label="Chargement des demandes..." />;

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Demandes d'Entretien d'Orientation</h2>
        <Button onClick={loadRequests} variant="outline">Actualiser</Button>
      </div>

      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Candidat</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Formation</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Durée</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Statut</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                  {new Date(req.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: '600' }}>{req.full_name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{req.phone} / {req.email}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{req.formation_title}</td>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{req.preferred_duration}</td>
                <td style={{ padding: '1rem' }}>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      background: req.status === 'pending' ? '#fef3c7' : req.status === 'completed' ? '#dcfce7' : '#f1f5f9',
                      color: req.status === 'pending' ? '#92400e' : req.status === 'completed' ? '#166534' : '#475569',
                      border: 'none'
                    }}
                  >
                    <option value="pending">En attente</option>
                    <option value="scheduled">Planifié</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(req.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  >
                    <i className="bx bx-trash" />
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                  Aucune demande pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

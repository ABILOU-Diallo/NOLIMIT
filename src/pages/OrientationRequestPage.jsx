import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PageBody, PageHero } from '../components/layout/PageHero';
import { Seo } from '../components/layout/Seo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { submitRequest } from '../services/orientationService';
import styles from '../components/forms/FormLayout.module.css';

export function OrientationRequestPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const formationTitle = params.get('formation') || '';
  const formationSlug = params.get('slug') || '';

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: 'Yaoundé',
      preferredDuration: '6 mois',
      message: formationTitle ? `Je souhaite avoir plus d'informations sur la formation : ${formationTitle}` : ''
    }
  });

  const onSubmit = async (data) => {
    setStatus('loading');
    setError('');
    try {
      await submitRequest({
        ...data,
        formationTitle,
        formationSlug
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de l\'envoi de votre demande.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <>
        <Seo title="Demande d'entretien envoyée" path="/demande-entretien" />
        <PageHero title="Demande reçue" lede="Votre demande d'entretien d'orientation a été transmise." />
        <PageBody>
          <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <i className="bx bx-check-circle" style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
            <h2>Merci, nous vous recontacterons !</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
              Un conseiller d'orientation du CFP NO LIMIT examinera votre demande et vous contactera par téléphone ou e-mail sous 24h à 48h.
            </p>
            <Button onClick={() => navigate('/formations-a-la-carte')}>Retour aux formations</Button>
          </div>
        </PageBody>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Entretien d'Orientation Personnalisé — CFP NO LIMIT Yaoundé"
        description="Prenez rendez-vous pour un entretien d'orientation gratuit. Nos conseillers vous aident à choisir la formation professionnelle adaptée à votre projet."
        path="/demande-entretien"
      />
      <PageHero
        title="Entretien d'Orientation"
        lede="Échangez avec un conseiller pour construire votre parcours sur mesure."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/formations-a-la-carte', label: 'Formations à la carte' },
          { label: 'Demande d\'entretien' }
        ]}
      />
      <PageBody>
        <div className={styles.container} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>Parlez-nous de votre projet</h3>

            {formationTitle && (
              <div style={{ padding: '1rem', background: '#eef2ff', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid #4f46e5' }}>
                <strong>Formation visée :</strong> {formationTitle}
              </div>
            )}

            <Input
              label="Nom complet *"
              {...register('fullName', { required: 'Ce champ est requis' })}
              error={errors.fullName?.message}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input
                label="E-mail *"
                type="email"
                {...register('email', { required: 'E-mail requis', pattern: { value: /^\S+@\S+$/i, message: 'E-mail invalide' } })}
                error={errors.email?.message}
              />
              <Input
                label="Téléphone *"
                {...register('phone', { required: 'Téléphone requis' })}
                error={errors.phone?.message}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Ville" {...register('city')} />
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Durée souhaitée</label>
                <select
                  {...register('preferredDuration')}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  <option value="3 mois">3 mois (Initiation)</option>
                  <option value="6 mois">6 mois (Perfectionnement)</option>
                  <option value="9 mois">9 mois (Expertise)</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Vos motivations / questions"
              rows={4}
              {...register('message')}
            />

            {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}

            <Button type="submit" full disabled={status === 'loading'}>
              {status === 'loading' ? 'Envoi...' : 'Envoyer ma demande d\'entretien'}
            </Button>
          </form>
        </div>
      </PageBody>
    </>
  );
}

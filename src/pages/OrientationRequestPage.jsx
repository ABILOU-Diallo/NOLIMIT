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
      message: formationTitle ? `Je souhaite obtenir un entretien pour discuter de mon projet concernant la formation : ${formationTitle}` : ''
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
      setError('Désolé, une erreur technique a empêché l\'envoi de votre demande. Veuillez réessayer ou nous contacter par téléphone.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <>
        <Seo title="Demande d'entretien transmise" path="/demande-entretien" />
        <PageHero title="Demande reçue" lede="Votre parcours commence ici." />
        <PageBody>
          <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h2>Merci pour votre confiance</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
              Votre demande d'entretien d'orientation a été transmise à notre service pédagogique. Un conseiller du **Groupe NO LIMIT** vous contactera sous peu pour fixer un rendez-vous et vous aider à bâtir votre avenir professionnel.
            </p>
            <Button onClick={() => navigate('/formations-a-la-carte')}>Découvrir d'autres formations</Button>
          </div>
        </PageBody>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Entretien d'Orientation Personnalisé — Groupe NO LIMIT"
        description="Construisez votre projet professionnel avec l'aide de nos conseillers. Prenez rendez-vous pour un entretien d'orientation gratuit à Yaoundé."
        path="/demande-entretien"
      />
      <PageHero
        title="Entretien d'Orientation"
        lede="Échangeons ensemble pour bâtir votre projet professionnel sur mesure."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { to: '/formations-a-la-carte', label: 'Formations à la carte' },
          { label: 'Demande d\'entretien' }
        ]}
      />
      <PageBody>
        <div className={styles.container} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>Votre profil & motivations</h3>

            {formationTitle && (
              <div style={{ padding: '1rem', background: '#f5f3ff', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-magenta-600)' }}>
                <span style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase' }}>Formation sélectionnée :</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', marginTop: '4px' }}>{formationTitle}</div>
              </div>
            )}

            <Input
              label="Nom complet *"
              placeholder="Votre nom et prénom"
              {...register('fullName', { required: 'Votre nom est indispensable pour vous identifier' })}
              error={errors.fullName?.message}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input
                label="E-mail *"
                type="email"
                placeholder="votre.email@domaine.com"
                {...register('email', { required: 'E-mail requis', pattern: { value: /^\S+@\S+$/i, message: 'E-mail invalide' } })}
                error={errors.email?.message}
              />
              <Input
                label="Téléphone *"
                placeholder="6XX XXX XXX"
                {...register('phone', { required: 'Nous avons besoin de votre numéro pour vous appeler' })}
                error={errors.phone?.message}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Ville actuelle" placeholder="Yaoundé, Douala..." {...register('city')} />
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Durée d'apprentissage souhaitée</label>
                <select
                  {...register('preferredDuration')}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }}
                >
                  <option value="3 mois">Formation intensive (3 mois)</option>
                  <option value="6 mois">Spécialisation (6 mois)</option>
                  <option value="9 mois">Expertise métier (9 mois)</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Parlez-nous de votre projet ou posez vos questions"
              placeholder="Décrivez brièvement vos attentes..."
              rows={4}
              {...register('message')}
            />

            {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', padding: '0.5rem', background: '#fef2f2', borderRadius: '8px' }}>{error}</p>}

            <Button type="submit" full disabled={status === 'loading'}>
              {status === 'loading' ? 'Transmission en cours...' : 'Envoyer ma demande d\'entretien'}
            </Button>
          </form>
        </div>
      </PageBody>
    </>
  );
}

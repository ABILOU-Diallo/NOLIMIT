import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'
import { LinkButton } from '../ui/LinkButton'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { site } from '../../data/site'
import { whatsappUrl } from '../../utils/format'
import { submitPreinscription } from '../../services/preinscriptionService'
import styles from './FormLayout.module.css'

const STEPS = [
  'Informations personnelles',
  'Formation & Diplôme',
  'Compléments & Tuteur',
  'Validation & Envoi',
]

export function PreinscriptionWizard({ formations }) {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [submissionResult, setSubmissionResult] = useState(null)

  const defaultFormation = useMemo(() => {
    const slug = params.get('formation')
    return formations.find((item) => item.slug === slug)?.id ?? ''
  }, [formations, params])

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: 'Yaoundé',
      birthDate: '',
      formationId: defaultFormation,
      diplomaInterest: '',
      guardianName: '',
      guardianPhone: '',
      message: '',
      consent: false,
    },
  })

  const selectedFormationId = watch('formationId')
  const selectedFormation = useMemo(() => {
    return formations.find((f) => f.id === selectedFormationId)
  }, [formations, selectedFormationId])

  async function next() {
    const fields = [
      ['fullName', 'email', 'phone'],
      ['formationId'],
      ['consent'],
      [],
    ][step]
    const ok = await trigger(fields)
    if (ok) setStep((value) => value + 1)
  }

  async function onSubmit(values) {
    setStatus('loading')
    setServerMessage('')

    const payload = {
      ...values,
      institution: selectedFormation?.institution || 'issmiga',
    }

    try {
      const result = await submitPreinscription(payload)
      if (result.ok) {
        setSubmissionResult(result)
        setStatus('success')
        return
      }
      setStatus('error')
      setServerMessage(result.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setServerMessage('Une erreur inattendue est survenue. Veuillez contacter le secrétariat.')
    }
  }

  const values = getValues()

  if (status === 'success') {
    const refCode = submissionResult?.reference || `NL-${new Date().getFullYear()}`
    const whatsappMsg = `Bonjour, je viens d'effectuer ma préinscription en ligne sur le site du Groupe NO LIMIT.\n\n👤 Nom: ${values.fullName}\n📄 Réf: ${refCode}\n🎓 Formation: ${selectedFormation?.title || 'Filière'}\n📞 Téléphone: ${values.phone}\n\nJe souhaite avoir les modalités pour finaliser mon dossier.`

    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '2.5rem',
        border: '1px solid var(--color-border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        textAlign: 'center',
        maxWidth: '42rem',
        margin: '0 auto'
      }} role="status">
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.12)',
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
          margin: '0 auto 1.25rem'
        }}>
          <i className="bx bx-check-circle" aria-hidden="true" />
        </div>

        <h2 style={{ fontSize: '1.6rem', color: 'var(--color-navy-900)', margin: '0 0 0.5rem 0' }}>
          Préinscription Enregistrée avec Succès !
        </h2>

        <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', margin: '0 0 1.5rem 0' }}>
          Félicitations <strong>{values.fullName}</strong>. Votre demande a bien été transmise à notre service des admissions.
        </p>

        {/* Reference & Recap Card */}
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid var(--color-border)',
          textAlign: 'left',
          marginBottom: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>Numéro de dossier :</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-magenta-600)', fontFamily: 'monospace' }}>
              {refCode}
            </strong>
          </div>
          <div style={{ fontSize: '0.95rem' }}>
            <strong>Formation :</strong> {selectedFormation?.title || 'Formation choisie'} ({selectedFormation?.diploma?.toUpperCase() || 'Diplôme'})
          </div>
          <div style={{ fontSize: '0.95rem' }}>
            <strong>Établissement :</strong> {selectedFormation?.institution === 'cfp' ? 'CFP NO LIMIT (Formation Pratique)' : 'ISSMIGA (Enseignement Supérieur)'}
          </div>
          <div style={{ fontSize: '0.95rem' }}>
            <strong>Contact :</strong> {values.phone} · {values.email}
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          background: 'rgba(238, 47, 139, 0.05)',
          borderLeft: '4px solid var(--color-magenta-600)',
          borderRadius: '0 8px 8px 0',
          padding: '1rem 1.25rem',
          textAlign: 'left',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          <strong>Prochaines étapes :</strong>
          <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
            <li>Un conseiller pédagogique vous contactera pour planifier un entretien d'orientation.</li>
            <li>Rendez-vous au campus (Yaoundé, derrière Tradex Emana) avec vos pièces justificatives.</li>
            <li>Rentrée académique fixée au <strong>{site.rentree.date}</strong>.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <LinkButton
            href={whatsappUrl(site.whatsapp.e164, whatsappMsg)}
            variant="secondary"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#25D366',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <i className="bx bxl-whatsapp" style={{ fontSize: '1.3rem' }} aria-hidden="true" />
            Finaliser mon dossier sur WhatsApp
          </LinkButton>
          <LinkButton to="/" variant="ghost">
            Retour à l'accueil
          </LinkButton>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.progress} aria-hidden="true">
        {STEPS.map((label, index) => (
          <span
            key={label}
            className={[styles.step, index <= step ? styles.active : ''].join(' ')}
          />
        ))}
      </div>
      <p style={{ fontWeight: 600, color: 'var(--color-navy-800)' }}>
        Étape {step + 1} sur {STEPS.length} — {STEPS[step]}
      </p>

      {status === 'error' ? (
        <div style={{
          padding: '1rem',
          background: 'var(--color-error-soft)',
          color: 'var(--color-error)',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.95rem'
        }} role="alert">
          {serverMessage}
        </div>
      ) : null}

      {step === 0 ? (
        <>
          <Input
            id="fullName"
            label="Nom et Prénom(s) complets"
            required
            placeholder="Ex: Amina Bello"
            error={errors.fullName?.message}
            {...register('fullName', { required: 'Indiquez votre nom complet.' })}
          />
          <Input
            id="email"
            type="email"
            label="Adresse E-mail"
            required
            placeholder="Ex: amina.bello@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Indiquez un e-mail valide.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format d’e-mail invalide.',
              },
            })}
          />
          <Input
            id="phone"
            label="Numéro de Téléphone (WhatsApp de préférence)"
            required
            placeholder="Ex: +237 678 529 675"
            hint="Ce numéro permettra à notre équipe de vous joindre immédiatement."
            error={errors.phone?.message}
            {...register('phone', { required: 'Indiquez votre numéro de téléphone.' })}
          />
          <Input
            id="city"
            label="Ville de résidence actuelle"
            placeholder="Ex: Yaoundé, Douala, Bafoussam..."
            {...register('city')}
          />
        </>
      ) : null}

      {step === 1 ? (
        <>
          <Select
            id="formationId"
            label="Choisir une Filière / Formation"
            required
            error={errors.formationId?.message}
            {...register('formationId', { required: 'Veuillez choisir une formation.' })}
          >
            <option value="">Sélectionnez une formation…</option>
            <optgroup label="🎓 ISSMIGA (Enseignement Supérieur : BTS / Licence / Master — Laptop Offert)">
              {formations
                .filter((item) => item.institution === 'issmiga')
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    [ISSMIGA] {item.title} ({item.diploma.toUpperCase()})
                  </option>
                ))}
            </optgroup>
            <optgroup label="⚙️ CFP NO LIMIT (Formation Pratique : CQP / DQP en 1 an)">
              {formations
                .filter((item) => item.institution === 'cfp')
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    [CFP] {item.title} ({item.diploma.toUpperCase()})
                  </option>
                ))}
            </optgroup>
          </Select>

          {selectedFormation && (
            <div style={{
              padding: '1rem',
              background: 'rgba(238, 47, 139, 0.08)',
              borderRadius: '8px',
              border: '1px solid rgba(238, 47, 139, 0.2)',
              fontSize: '0.9rem',
              color: 'var(--color-navy-900)'
            }}>
              <strong>Détail de la formation :</strong> {selectedFormation.title}
              <br />
              <span>Durée : {selectedFormation.duration} · Diplôme visé : {selectedFormation.diploma?.toUpperCase()}</span>
              {selectedFormation.institution === 'issmiga' && (
                <div style={{ marginTop: '0.35rem', color: '#db2777', fontWeight: 600 }}>
                  🎁 1 Étudiant Inscrit = 1 Ordinateur Portable (Laptop) Offert
                </div>
              )}
            </div>
          )}

          <Select id="diplomaInterest" label="Niveau / Diplôme préparé" {...register('diplomaInterest')}>
            <option value="">Indiquez votre diplôme souhaité…</option>
            <option value="bts">BTS (Brevet de Technicien Supérieur — ISSMIGA)</option>
            <option value="licence">Licence Professionnelle (ISSMIGA)</option>
            <option value="master">Master Professionnel (ISSMIGA)</option>
            <option value="cqp">CQP (Certificat de Qualification Professionnelle — CFP NO LIMIT)</option>
            <option value="dqp">DQP (Diplôme de Qualification Professionnelle — CFP NO LIMIT)</option>
            <option value="langue">Centre de Langues (Allemand, Anglais, Français)</option>
          </Select>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Input id="birthDate" type="date" label="Date de naissance (Optionnel)" {...register('birthDate')} />
          <Input
            id="guardianName"
            label="Nom du parent ou tuteur légal (si applicable)"
            placeholder="Ex: M. / Mme Bello"
            {...register('guardianName')}
          />
          <Input
            id="guardianPhone"
            label="Téléphone du parent ou tuteur"
            placeholder="Ex: +237 677 000 111"
            {...register('guardianPhone')}
          />
          <Textarea
            id="message"
            label="Questions particulières ou projet professionnel (Optionnel)"
            placeholder="Parlez-nous brièvement de vos motivations ou attentes..."
            {...register('message')}
          />
          <Checkbox
            id="consent"
            label="J’accepte que le Groupe NO LIMIT & ISSMIGA conserve et traite ces informations pour l'examen de mon dossier d'admission."
            error={errors.consent?.message}
            {...register('consent', { required: 'Le consentement est nécessaire pour soumettre votre dossier.' })}
          />
        </>
      ) : null}

      {step === 3 ? (
        <div style={{
          background: 'var(--color-surface)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-navy-900)' }}>
            Récapitulatif de votre candidature
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div>
              <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.82rem' }}>Candidat(e) :</span>
              <strong>{values.fullName || '—'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.82rem' }}>Téléphone :</span>
              <strong>{values.phone || '—'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.82rem' }}>E-mail :</span>
              <strong>{values.email || '—'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.82rem' }}>Ville :</span>
              <strong>{values.city || 'Yaoundé'}</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '0.75rem' }}>
            <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '0.82rem' }}>Formation choisie :</span>
            <strong style={{ color: 'var(--color-magenta-600)', fontSize: '1.05rem' }}>
              {selectedFormation ? `${selectedFormation.title} (${selectedFormation.diploma?.toUpperCase()})` : 'Formation non sélectionnée'}
            </strong>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              Établissement : {selectedFormation?.institution === 'cfp' ? 'CFP NO LIMIT' : 'ISSMIGA'}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
            En cliquant sur "Confirmer et envoyer", votre préinscription sera transmise à notre secrétariat.
          </p>
        </div>
      ) : null}

      <div className={styles.actions}>
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>
            Précédent
          </Button>
        ) : null}
        {step < 3 ? (
          <Button type="button" onClick={next}>
            Continuer
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting || status === 'loading'}>
            {status === 'loading' ? 'Transmission du dossier en cours…' : 'Confirmer et envoyer la préinscription'}
          </Button>
        )}
      </div>
    </form>
  )
}


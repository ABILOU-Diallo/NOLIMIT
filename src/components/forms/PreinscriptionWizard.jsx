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
  'Formation recherchée',
  'Compléments',
  'Confirmation',
]

export function PreinscriptionWizard({ formations }) {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')

  const defaultFormation = useMemo(() => {
    const slug = params.get('formation')
    return formations.find((item) => item.slug === slug)?.id ?? ''
  }, [formations, params])

  const {
    register,
    handleSubmit,
    trigger,
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
    const result = await submitPreinscription(values)
    if (result.ok) {
      setStatus('success')
      return
    }
    setStatus('error')
    setServerMessage(result.message)
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <h2>Préinscription envoyée</h2>
        <p>
          Merci. Un conseiller vous recontactera. L’admission définitive se fait sur dossier,
          au campus.
        </p>
        <LinkButton
          href={whatsappUrl(site.whatsapp.e164, site.whatsapp.message)}
          variant="secondary"
          target="_blank"
          rel="noreferrer"
        >
          Continuer sur WhatsApp
        </LinkButton>
      </div>
    )
  }

  const values = getValues()

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
      <p>
        Étape {step + 1} sur {STEPS.length} — {STEPS[step]}
      </p>

      {status === 'error' ? (
        <p className={styles.error} role="alert">
          {serverMessage}
        </p>
      ) : null}

      {step === 0 ? (
        <>
          <Input
            id="fullName"
            label="Nom complet"
            required
            error={errors.fullName?.message}
            {...register('fullName', { required: 'Indiquez votre nom.' })}
          />
          <Input
            id="email"
            type="email"
            label="E-mail"
            required
            error={errors.email?.message}
            {...register('email', {
              required: 'Indiquez un e-mail.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail invalide.',
              },
            })}
          />
          <Input
            id="phone"
            label="Téléphone"
            required
            hint="De préférence un numéro joignable sur WhatsApp."
            error={errors.phone?.message}
            {...register('phone', { required: 'Indiquez un téléphone.' })}
          />
          <Input id="city" label="Ville" {...register('city')} />
        </>
      ) : null}

      {step === 1 ? (
        <>
          <Select
            id="formationId"
            label="Formation"
            required
            error={errors.formationId?.message}
            {...register('formationId', { required: 'Choisissez une formation.' })}
          >
            <option value="">Choisir…</option>
            <optgroup label="ISSMIGA (BTS / Licence / Master — Laptop offert)">
              {formations
                .filter((item) => item.institution === 'issmiga')
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    [ISSMIGA] {item.title} ({item.diploma.toUpperCase()})
                  </option>
                ))}
            </optgroup>
            <optgroup label="CFP NO LIMIT (CQP / DQP — Formation Professionnelle)">
              {formations
                .filter((item) => item.institution === 'cfp')
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    [CFP] {item.title} ({item.diploma.toUpperCase()})
                  </option>
                ))}
            </optgroup>
          </Select>
          <Select id="diplomaInterest" label="Diplôme visé" {...register('diplomaInterest')}>
            <option value="">Je ne sais pas encore</option>

            <option value="bts">BTS (Brevet de Technicien Supérieur - ISSMIGA)</option>
            <option value="licence">Licence Professionnelle (ISSMIGA)</option>
            <option value="master">Master Professionnel (ISSMIGA)</option>
            <option value="cqp">CQP (Certificat de Qualification Professionnelle - CFP)</option>
            <option value="dqp">DQP (Diplôme de Qualification Professionnelle - CFP)</option>
            <option value="langue">Langues & Certifications</option>
          </Select>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Input id="birthDate" type="date" label="Date de naissance" {...register('birthDate')} />
          <Input
            id="guardianName"
            label="Parent / tuteur (optionnel)"
            {...register('guardianName')}
          />
          <Input
            id="guardianPhone"
            label="Téléphone du parent / tuteur"
            {...register('guardianPhone')}
          />
          <Textarea id="message" label="Précisions" {...register('message')} />
          <Checkbox
            id="consent"
            label="J’accepte que le Groupe NO LIMIT utilise ces informations pour mon suivi d’admission."
            error={errors.consent?.message}
            {...register('consent', { required: 'Le consentement est nécessaire.' })}
          />
        </>
      ) : null}

      {step === 3 ? (
        <div>
          <p>
            <strong>{values.fullName}</strong>
            <br />
            {values.email} · {values.phone}
          </p>
          <p className={styles.muted}>Vérifiez, puis envoyez. Vous pourrez encore modifier en revenant en arrière.</p>
        </div>
      ) : null}

      <div className={styles.actions}>
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>
            Retour
          </Button>
        ) : null}
        {step < 3 ? (
          <Button type="button" onClick={next}>
            Continuer
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting || status === 'loading'}>
            {status === 'loading' ? 'Envoi…' : 'Envoyer la préinscription'}
          </Button>
        )}
      </div>
    </form>
  )
}

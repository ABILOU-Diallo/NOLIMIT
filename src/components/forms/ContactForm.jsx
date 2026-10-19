import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { submitContact } from '../../services/contactService'
import styles from './FormLayout.module.css'

export function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values) {
    setStatus('loading')
    const result = await submitContact(values)
    if (result.ok) {
      setStatus('success')
      return
    }
    setStatus('error')
    setServerMessage(result.message)
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status" style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📩</div>
        <h2 style={{ color: 'var(--color-navy-900)' }}>Demande transmise avec succès</h2>
        <p style={{ color: '#64748b', lineHeight: '1.6' }}>
          Merci d'avoir contacté le Groupe NO LIMIT. Notre équipe administrative a bien reçu votre message et vous apportera une réponse dans les plus brefs délais, généralement sous 24h à 48h ouvrées.
        </p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === 'error' ? (
        <p className={styles.error} role="alert">
          {serverMessage}
        </p>
      ) : null}
      <Input
        id="fullName"
        label="Nom complet"
        required
        placeholder="Votre nom et prénom"
        error={errors.fullName?.message}
        {...register('fullName', { required: 'Indiquez votre nom complet.' })}
      />
      <Input
        id="email"
        type="email"
        label="Adresse E-mail"
        required
        placeholder="votre.email@domaine.com"
        error={errors.email?.message}
        {...register('email', { required: 'Indiquez une adresse e-mail valide.' })}
      />
      <Input
        id="phone"
        label="Téléphone"
        placeholder="Ex: 6XX XXX XXX"
        {...register('phone')}
      />
      <Input
        id="subject"
        label="Objet du message"
        required
        placeholder="Sujet de votre demande"
        error={errors.subject?.message}
        {...register('subject', { required: 'Indiquez l\'objet de votre message.' })}
      />
      <Textarea
        id="message"
        label="Votre Message"
        required
        placeholder="Comment pouvons-nous vous aider ?"
        error={errors.message?.message}
        {...register('message', { required: 'Merci de saisir votre message.' })}
      />
      <Button type="submit" disabled={isSubmitting || status === 'loading'} full>
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </Button>
    </form>
  )
}

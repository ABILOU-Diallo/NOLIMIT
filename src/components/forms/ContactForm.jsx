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
      <div className={styles.success} role="status">
        <h2>Message envoyé</h2>
        <p>Le secrétariat vous répondra aux horaires d’ouverture, 8h – 17h.</p>
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
        label="Nom"
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
        {...register('email', { required: 'Indiquez un e-mail.' })}
      />
      <Input id="phone" label="Téléphone" {...register('phone')} />
      <Input
        id="subject"
        label="Objet"
        required
        error={errors.subject?.message}
        {...register('subject', { required: 'Indiquez un objet.' })}
      />
      <Textarea
        id="message"
        label="Message"
        required
        error={errors.message?.message}
        {...register('message', { required: 'Écrivez votre message.' })}
      />
      <Button type="submit" disabled={isSubmitting || status === 'loading'}>
        {status === 'loading' ? 'Envoi…' : 'Envoyer'}
      </Button>
    </form>
  )
}

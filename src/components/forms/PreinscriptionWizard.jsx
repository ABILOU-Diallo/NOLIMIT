import { useMemo, useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"
import { Checkbox } from "../ui/Checkbox"
import { Input } from "../ui/Input"
import { LinkButton } from "../ui/LinkButton"
import { Select } from "../ui/Select"
import { Textarea } from "../ui/Textarea"
import { Avatar } from "../ui/Avatar"
import { Loader } from "../ui/Loader"
import { site } from "../../data/site"
import { whatsappUrl, whatsappIcon } from "../../utils/format"
import { submitPreinscription, uploadPreinscriptionPhoto } from "../../services/preinscriptionService"
import styles from "./FormLayout.module.css"

const STEPS = [
  { label: "Profil", icon: "bx-user" },
  { label: "Établissement", icon: "bx-building" },
  { label: "Filière", icon: "bx-graduation" },
  { label: "Documents", icon: "bx-file" },
  { label: "Tuteur", icon: "bx-group" },
  { label: "Validation", icon: "bx-send" },
]

const REQUIRED_DOCUMENTS = [
  "Fiche d’inscription dûment remplie",
  "Demande d’admission rédigée par le candidat",
  "Photocopie de l’acte de naissance",
  "Photocopie du diplôme",
  "Photocopie de la CNI, carte scolaire ou pièce équivalente",
  "Deux photos 4×4 en couleur",
  "Une enveloppe portant l’adresse du candidat",
]

const DIPLOMAS_BY_INSTITUTION = {
  issmiga: [
    { value: "bts",     label: "BTS (2 ans)" },
    { value: "licence", label: "Licence Professionnelle (1 an post-BTS)" },
    { value: "master",  label: "Master Professionnel (2 ans post-Licence)" },
  ],
  cfp: [
    { value: "cqp",         label: "CQP - Certificat de Qualification Professionnel (1 an)" },
    { value: "dqp",         label: "DQP - Diplôme de Qualification Professionnel (1 an)" },
    { value: "attestation", label: "Attestation (3, 6 ou 9 mois)" },
  ],
}

export function PreinscriptionWizard({ formations = [] }) {
  const safeFormations = formations || []
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState("idle")
  const [serverMessage, setServerMessage] = useState("")
  const [submissionResult, setSubmissionResult] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState("")
  const fileInputRef = useRef(null)

  const preselectedFormation = useMemo(() => {
    const slug = params.get("formation")
    return safeFormations.find((item) => item.slug === slug) ?? null
  }, [safeFormations, params])

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "Yaoundé",
      institution: preselectedFormation?.institution ?? "",
      formationId: preselectedFormation?.id ?? "",
      diplomaInterest: preselectedFormation?.diploma ?? "",
      photoUrl: "",
      documentsChecklist: [],
      guardianName: "",
      guardianPhone: "",
      message: "",
      consent: false,
    },
  })

  const values = watch()

  const filteredFormations = useMemo(() => {
    if (!values.institution) return []
    return safeFormations.filter(f => f.institution === values.institution)
  }, [safeFormations, values.institution])

  const selectedFormation = useMemo(() => {
    return safeFormations.find(f => f.id === values.formationId) || null
  }, [safeFormations, values.formationId])

  useEffect(() => {
    if (values.institution && selectedFormation && selectedFormation.institution !== values.institution) {
      setValue("formationId", "")
      setValue("diplomaInterest", "")
    }
  }, [values.institution, selectedFormation, setValue])

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPhotoPreview(objectUrl)

    try {
      setUploading(true)
      const url = await uploadPreinscriptionPhoto(file)
      setValue("photoUrl", url)
    } catch (err) {
      setServerMessage("Note : La photo n'a pas pu être envoyée au serveur, mais vous pouvez continuer.")
    } finally {
      setUploading(false)
    }
  }

  const next = async () => {
    const fieldsByStep = [
      ["fullName", "email", "phone"],
      ["institution"],
      ["formationId", "diplomaInterest"],
      [],
      ["consent"],
      []
    ]
    const ok = await trigger(fieldsByStep[step])
    if (ok) {
      setStep(s => s + 1)
      window.scrollTo(0, 0)
    }
  }

  async function onSubmit(data) {
    try {
      setStatus("loading")
      const res = await submitPreinscription({
        ...data,
        institution: data.institution || selectedFormation?.institution || "issmiga"
      })
      setSubmissionResult(res)
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setServerMessage("Erreur lors de la soumission. Veuillez réessayer.")
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>
          <i className='bx bx-check-shield' />
        </div>
        <h2 style={{ color: 'var(--color-navy-900)', marginBottom: '1rem' }}>Félicitations ! Votre demande est enregistrée</h2>
        <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
          Le Groupe NO LIMIT a bien reçu votre dossier de préinscription. Nous sommes ravis de vous compter parmi nos futurs étudiants.
        </p>
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Référence du dossier</span>
          <strong style={{ fontSize: '1.25rem', color: 'var(--color-magenta-600)' }}>{submissionResult?.reference}</strong>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <LinkButton to="/" variant="ghost">Retour à l'accueil</LinkButton>
          <a href={whatsappUrl(site.phone, `Bonjour, j'ai effectué ma préinscription au Groupe NO LIMIT sous la référence ${submissionResult?.reference}.`)} target="_blank" rel="noopener" className="button button-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 700 }}>
            {whatsappIcon} Confirmer sur WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', left: '0', right: '0', height: '2px', background: '#e2e8f0', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20px', left: '0', width: `${(step / (STEPS.length - 1)) * 100}%`, height: '2px', background: 'var(--color-magenta-600)', zIndex: 0, transition: 'width 0.3s ease' }} />

        {STEPS.map((s, i) => (
          <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: i <= step ? 'var(--color-magenta-600)' : '#fff',
              color: i <= step ? '#fff' : '#94a3b8',
              border: i <= step ? 'none' : '2px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              {i < step ? <i className='bx bx-check' /> : <i className={`bx ${s.icon}`} />}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: i <= step ? 700 : 500, color: i <= step ? 'var(--color-navy-900)' : '#94a3b8' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
        {serverMessage && <div style={{ padding: '1rem', background: '#fff7ed', color: '#c2410c', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{serverMessage}</div>}

        {step === 0 && (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Input label="Nom complet *" {...register("fullName", { required: true })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Email *" type="email" {...register("email", { required: true })} />
              <Input label="Téléphone *" {...register("phone", { required: true })} />
            </div>
            <Input label="Ville de résidence" {...register("city")} />
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Établissement souhaité</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button type="button" onClick={() => setValue("institution", "issmiga")} style={{ padding: '1.5rem', borderRadius: '16px', border: `2px solid ${values.institution === 'issmiga' ? 'var(--color-magenta-600)' : '#e2e8f0'}`, background: values.institution === 'issmiga' ? 'rgba(238,47,139,0.05)' : '#fff', cursor: 'pointer' }}>
                <div style={{ fontSize: '2rem' }}>🎓</div>
                <div style={{ fontWeight: 700 }}>ISSMIGA</div>
              </button>
              <button type="button" onClick={() => setValue("institution", "cfp")} style={{ padding: '1.5rem', borderRadius: '16px', border: `2px solid ${values.institution === 'cfp' ? 'var(--color-magenta-600)' : '#e2e8f0'}`, background: values.institution === 'cfp' ? 'rgba(238, 47, 139, 0.05)' : '#fff', cursor: 'pointer' }}>
                <div style={{ fontSize: '2rem' }}>⚙️</div>
                <div style={{ fontWeight: 700 }}>CFP NO LIMIT</div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Select label="Choisir votre Filière *" {...register("formationId", { required: true })}>
              <option value="">Sélectionnez...</option>
              {filteredFormations.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
            </Select>
            <Select label="Diplôme ou Niveau visé *" {...register("diplomaInterest", { required: true })}>
              <option value="">Sélectionnez...</option>
              {(DIPLOMAS_BY_INSTITUTION[values.institution] || []).map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </Select>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer', margin: '0 auto', width: '130px', height: '150px', borderRadius: '16px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f8fafc' }}>
                {uploading ? <Loader /> : (photoPreview || values.photoUrl) ? <img src={photoPreview || values.photoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className='bx bx-camera' style={{ fontSize: '2rem', color: '#94a3b8' }} />}
              </div>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handlePhotoUpload} />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#64748b' }}>Photo d'identité (Portrait)</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>Pièces fournies :</p>
              {REQUIRED_DOCUMENTS.map(doc => <Checkbox key={doc} label={doc} value={doc} {...register("documentsChecklist")} />)}
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Input label="Date de naissance" type="date" {...register("birthDate")} />
            <Input label="Tuteur / Parent" {...register("guardianName")} />
            <Input label="Téléphone Tuteur" {...register("guardianPhone")} />
            <Checkbox label="J'accepte le traitement de mes données *" {...register("consent", { required: true })} />
          </div>
        )}

        {step === 5 && (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px' }}>
            <Avatar src={photoPreview || values.photoUrl} name={values.fullName} />
            <div>
              <h3 style={{ margin: 0 }}>{values.fullName || "Candidat"}</h3>
              <p style={{ margin: 0, color: 'var(--color-magenta-600)', fontWeight: 700 }}>{selectedFormation?.title}</p>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>{values.institution?.toUpperCase()} · {values.diplomaInterest?.toUpperCase()}</p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button type="button" variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}>{step === 0 ? "Annuler" : "Précédent"}</Button>
          {step < 5 ? <Button type="button" onClick={next}>Continuer</Button> : <Button type="submit" disabled={isSubmitting}>Confirmer l'envoi</Button>}
        </div>
      </div>
    </form>
  )
}

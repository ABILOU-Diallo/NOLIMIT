import { useMemo, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { Button } from "../ui/Button"
import { Checkbox } from "../ui/Checkbox"
import { Input } from "../ui/Input"
import { LinkButton } from "../ui/LinkButton"
import { Select } from "../ui/Select"
import { Textarea } from "../ui/Textarea"
import { site } from "../../data/site"
import { whatsappUrl } from "../../utils/format"
import { submitPreinscription } from "../../services/preinscriptionService"
import styles from "./FormLayout.module.css"

const STEPS = [
  "Informations personnelles",
  "Filiere & Niveau de diplome",
  "Complements & Tuteur",
  "Validation & Envoi",
]

const DIPLOMAS_BY_INSTITUTION = {
  issmiga: [
    { value: "bts",     label: "BTS - Brevet de Technicien Superieur (2 ans)" },
    { value: "licence", label: "Licence Professionnelle (3 ans)" },
    { value: "master",  label: "Master Professionnel (5 ans)" },
  ],
  cfp: [
    { value: "cqp",         label: "CQP - Certificat de Qualification Professionnelle (6-9 mois)" },
    { value: "dqp",         label: "DQP - Diplome de Qualification Professionnelle (1 an)" },
    { value: "attestation", label: "Attestation - Formation courte (3, 6 ou 9 mois)" },
  ],
  langue: [
    { value: "a1_a2",  label: "Niveaux A1-A2 (Debutant)" },
    { value: "b1_b2",  label: "Niveaux B1-B2 (Intermediaire)" },
    { value: "c1_c2",  label: "Niveaux C1-C2 (Avance)" },
    { value: "toefl",  label: "TOEFL / IELTS / SAT (Anglais)" },
    { value: "tcf",    label: "TCF / TEF (Francais)" },
    { value: "goethe", label: "Goethe-Zertifikat / TestDaF (Allemand)" },
  ],
}

export function PreinscriptionWizard({ formations }) {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState("idle")
  const [serverMessage, setServerMessage] = useState("")
  const [submissionResult, setSubmissionResult] = useState(null)

  const preselectedFormation = useMemo(() => {
    const slug = params.get("formation")
    return formations.find((item) => item.slug === slug) ?? null
  }, [formations, params])

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "Yaounde",
      birthDate: "",
      formationId: preselectedFormation?.id ?? "",
      diplomaInterest: preselectedFormation?.diploma ?? "",
      guardianName: "",
      guardianPhone: "",
      message: "",
      consent: false,
    },
  })

  const selectedFormationId = watch("formationId")

  const selectedFormation = useMemo(() => {
    if (!selectedFormationId) return null
    return formations.find((f) => f.id === selectedFormationId) ?? null
  }, [formations, selectedFormationId])

  const selectedInstitution = selectedFormation?.institution ?? null

  const availableDiplomas = useMemo(() => {
    if (!selectedInstitution) return []
    return DIPLOMAS_BY_INSTITUTION[selectedInstitution] ?? []
  }, [selectedInstitution])

  useEffect(() => {
    if (selectedFormation) {
      const matching = availableDiplomas.find((d) => d.value === selectedFormation.diploma)
      setValue("diplomaInterest", matching ? matching.value : "")
    } else {
      setValue("diplomaInterest", "")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFormationId])

  async function next() {
    const fields = [
      ["fullName", "email", "phone"],
      ["formationId", "diplomaInterest"],
      ["consent"],
      [],
    ][step]
    const ok = await trigger(fields)
    if (ok) setStep((v) => v + 1)
  }

  async function onSubmit(values) {
    setStatus("loading")
    setServerMessage("")
    const payload = { ...values, institution: selectedFormation?.institution || "issmiga" }
    try {
      const result = await submitPreinscription(payload)
      if (result.ok) { setSubmissionResult(result); setStatus("success"); return }
      setStatus("error")
      setServerMessage(result.message || "Une erreur est survenue. Veuillez reessayer.")
    } catch (err) {
      console.error(err)
      setStatus("error")
      setServerMessage("Une erreur inattendue est survenue. Veuillez contacter le secretariat.")
    }
  }

  const values = getValues()

  if (status === "success") {
    const refCode = submissionResult?.reference || `NL-${new Date().getFullYear()}`
    const diplomaLabel =
      availableDiplomas.find((d) => d.value === values.diplomaInterest)?.label ??
      values.diplomaInterest?.toUpperCase()
    const whatsappMsg =
      `Bonjour, je viens d effectuer ma preinscription sur le site du Groupe NO LIMIT.\n\n` +
      `Nom: ${values.fullName}\nRef: ${refCode}\nFormation: ${selectedFormation?.title || "Filiere"}\n` +
      `Diplome: ${diplomaLabel}\nTelephone: ${values.phone}\n\n` +
      `Je souhaite avoir les modalites pour finaliser mon dossier.`

    return (
      <div style={{ background:"#fff", borderRadius:"16px", padding:"2.5rem", border:"1px solid var(--color-border)", boxShadow:"0 8px 32px rgba(0,0,0,0.06)", textAlign:"center", maxWidth:"42rem", margin:"0 auto" }} role="status">
        <div style={{ width:"64px", height:"64px", borderRadius:"50%", background:"rgba(16,185,129,0.12)", color:"#10b981", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.2rem", margin:"0 auto 1.25rem" }}>
          <i className="bx bx-check-circle" aria-hidden="true" />
        </div>
        <h2 style={{ fontSize:"1.6rem", color:"var(--color-navy-900)", margin:"0 0 0.5rem 0" }}>
          Preinscription Enregistree avec Succes !
        </h2>
        <p style={{ color:"var(--color-muted)", fontSize:"1.05rem", margin:"0 0 1.5rem 0" }}>
          Felicitations <strong>{values.fullName}</strong>. Votre demande a bien ete transmise.
        </p>
        <div style={{ background:"var(--color-surface)", borderRadius:"12px", padding:"1.5rem", border:"1px solid var(--color-border)", textAlign:"left", marginBottom:"1.75rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", borderBottom:"1px dashed var(--color-border)", paddingBottom:"0.75rem" }}>
            <span style={{ fontSize:"0.9rem", color:"var(--color-muted)" }}>Numero de dossier :</span>
            <strong style={{ fontSize:"1.1rem", color:"var(--color-magenta-600)", fontFamily:"monospace" }}>{refCode}</strong>
          </div>
          <div style={{ fontSize:"0.95rem" }}><strong>Filiere :</strong> {selectedFormation?.title || "Formation choisie"}</div>
          <div style={{ fontSize:"0.95rem" }}><strong>Diplome vise :</strong> {diplomaLabel || "—"}</div>
          <div style={{ fontSize:"0.95rem" }}><strong>Etablissement :</strong> {selectedFormation?.institution === "cfp" ? "CFP NO LIMIT" : "ISSMIGA"}</div>
          <div style={{ fontSize:"0.95rem" }}><strong>Contact :</strong> {values.phone} · {values.email}</div>
        </div>
        <div style={{ background:"rgba(238,47,139,0.05)", borderLeft:"4px solid var(--color-magenta-600)", borderRadius:"0 8px 8px 0", padding:"1rem 1.25rem", textAlign:"left", marginBottom:"2rem", fontSize:"0.95rem", lineHeight:"1.5" }}>
          <strong>Prochaines etapes :</strong>
          <ul style={{ margin:"0.5rem 0 0 1.25rem", padding:0 }}>
            <li>Un conseiller pedagogique vous contactera pour planifier un entretien.</li>
            <li>Rendez-vous au campus (Yaounde, derriere Tradex Emana) avec vos pieces.</li>
            <li>Rentree academique fixee au <strong>{site.rentree.date}</strong>.</li>
          </ul>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center" }}>
          <LinkButton href={whatsappUrl(site.whatsapp.e164, whatsappMsg)} variant="secondary" target="_blank" rel="noreferrer" style={{ background:"#25D366", color:"#fff", display:"inline-flex", alignItems:"center", gap:"0.5rem" }}>
            <i className="bx bxl-whatsapp" style={{ fontSize:"1.3rem" }} aria-hidden="true" />
            Finaliser sur WhatsApp
          </LinkButton>
          <LinkButton to="/" variant="ghost">Retour a l accueil</LinkButton>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.progress} aria-hidden="true">
        {STEPS.map((label, index) => (
          <span key={label} className={[styles.step, index <= step ? styles.active : ""].join(" ")} />
        ))}
      </div>
      <p style={{ fontWeight:600, color:"var(--color-navy-800)" }}>
        Etape {step + 1} sur {STEPS.length} — {STEPS[step]}
      </p>

      {status === "error" && (
        <div style={{ padding:"1rem", background:"var(--color-error-soft)", color:"var(--color-error)", borderRadius:"8px", marginBottom:"1rem", fontSize:"0.95rem" }} role="alert">
          {serverMessage}
        </div>
      )}

      {/* ETAPE 0 */}
      {step === 0 && (
        <>
          <Input id="fullName" label="Nom et Prenom(s) complets" required placeholder="Ex: Amina Bello" error={errors.fullName?.message} {...register("fullName", { required: "Indiquez votre nom complet." })} />
          <Input id="email" type="email" label="Adresse E-mail" required placeholder="Ex: amina.bello@example.com" error={errors.email?.message} {...register("email", { required: "Indiquez un e-mail valide.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Format invalide." } })} />
          <Input id="phone" label="Telephone (WhatsApp de preference)" required placeholder="Ex: +237 678 529 675" hint="Ce numero permettra a notre equipe de vous joindre." error={errors.phone?.message} {...register("phone", { required: "Indiquez votre numero de telephone." })} />
          <Input id="city" label="Ville de residence actuelle" placeholder="Ex: Yaounde, Douala, Bafoussam..." {...register("city")} />
        </>
      )}

      {/* ETAPE 1 — Filiere + Diplome filtre */}
      {step === 1 && (
        <>
          {preselectedFormation && (
            <div style={{ padding:"0.85rem 1rem", background:"rgba(37,99,235,0.07)", borderLeft:"4px solid #2563eb", borderRadius:"0 8px 8px 0", marginBottom:"0.5rem", fontSize:"0.9rem", color:"var(--color-navy-900)", display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <i className="bx bx-info-circle" style={{ fontSize:"1.1rem", color:"#2563eb", flexShrink:0 }} />
              <span>Formation pre-chargee : <strong>{preselectedFormation.title}</strong>. Vous pouvez la modifier ci-dessous.</span>
            </div>
          )}

          <Select id="formationId" label="Choisir une Filiere / Formation" required error={errors.formationId?.message} {...register("formationId", { required: "Veuillez choisir une filiere." })}>
            <option value="">Selectionnez une filiere...</option>
            <optgroup label="🎓 ISSMIGA — Enseignement Superieur (BTS / Licence / Master · Laptop Offert)">
              {formations.filter((item) => item.institution === "issmiga").map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </optgroup>
            <optgroup label="⚙️ CFP NO LIMIT — Formation Pratique (CQP / DQP · Attestation)">
              {formations.filter((item) => item.institution === "cfp").map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </optgroup>
          </Select>

          {selectedFormation && (
            <div style={{ padding:"1rem", background: selectedFormation.institution === "issmiga" ? "rgba(238,47,139,0.07)" : "rgba(249,115,22,0.07)", borderRadius:"10px", border:`1px solid ${selectedFormation.institution === "issmiga" ? "rgba(238,47,139,0.25)" : "rgba(249,115,22,0.25)"}`, fontSize:"0.9rem", color:"var(--color-navy-900)", display:"flex", flexDirection:"column", gap:"0.3rem" }}>
              <strong style={{ fontSize:"1rem" }}>
                {selectedFormation.institution === "issmiga" ? "🎓" : "⚙️"} {selectedFormation.title}
              </strong>
              <span style={{ color:"var(--color-muted)" }}>Duree : {selectedFormation.duration}</span>
              {selectedFormation.institution === "issmiga" && (
                <span style={{ color:"#db2777", fontWeight:600 }}>🎁 1 Etudiant inscrit = 1 Laptop offert</span>
              )}
              {selectedFormation.excerpt && (
                <p style={{ margin:"0.4rem 0 0", color:"var(--color-muted)", lineHeight:"1.55", fontSize:"0.85rem" }}>
                  {selectedFormation.excerpt}
                </p>
              )}
            </div>
          )}

          {selectedFormation ? (
            <Select
              id="diplomaInterest"
              label={selectedFormation.institution === "issmiga" ? "Niveau / Diplome vise (ISSMIGA)" : "Certification visee (CFP NO LIMIT)"}
              required
              hint={selectedFormation.institution === "issmiga"
                ? "ISSMIGA propose BTS (2 ans), Licence (3 ans) et Master (5 ans) pour cette filiere."
                : "CFP NO LIMIT propose des attestations 3/6/9 mois, CQP et DQP (1 an)."}
              error={errors.diplomaInterest?.message}
              {...register("diplomaInterest", { required: "Choisissez le diplome ou niveau vise." })}
            >
              <option value="">Choisissez votre niveau...</option>
              {availableDiplomas.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </Select>
          ) : (
            <div style={{ padding:"0.85rem 1rem", background:"var(--color-surface)", border:"1px dashed var(--color-border)", borderRadius:"8px", color:"var(--color-muted)", fontSize:"0.9rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <i className="bx bx-arrow-back" />
              Selectionnez d abord une filiere pour voir les niveaux de diplome disponibles.
            </div>
          )}
        </>
      )}

      {/* ETAPE 2 */}
      {step === 2 && (
        <>
          <Input id="birthDate" type="date" label="Date de naissance (Optionnel)" {...register("birthDate")} />
          <Input id="guardianName" label="Nom du parent ou tuteur legal (si applicable)" placeholder="Ex: M. / Mme Bello" {...register("guardianName")} />
          <Input id="guardianPhone" label="Telephone du parent ou tuteur" placeholder="Ex: +237 677 000 111" {...register("guardianPhone")} />
          <Textarea id="message" label="Questions particulieres ou projet professionnel (Optionnel)" placeholder="Parlez-nous brievement de vos motivations..." {...register("message")} />
          <Checkbox id="consent" label="J accepte que le Groupe NO LIMIT conserve et traite ces informations pour l examen de mon dossier." error={errors.consent?.message} {...register("consent", { required: "Le consentement est necessaire pour soumettre votre dossier." })} />
        </>
      )}

      {/* ETAPE 3 — Recapitulatif */}
      {step === 3 && (
        <div style={{ background:"var(--color-surface)", padding:"1.5rem", borderRadius:"12px", border:"1px solid var(--color-border)", display:"flex", flexDirection:"column", gap:"1rem" }}>
          <h3 style={{ margin:0, fontSize:"1.1rem", color:"var(--color-navy-900)" }}>Recapitulatif de votre candidature</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"0.75rem", fontSize:"0.95rem" }}>
            <div><span style={{ color:"var(--color-muted)", display:"block", fontSize:"0.82rem" }}>Candidat(e) :</span><strong>{values.fullName || "—"}</strong></div>
            <div><span style={{ color:"var(--color-muted)", display:"block", fontSize:"0.82rem" }}>Telephone :</span><strong>{values.phone || "—"}</strong></div>
            <div><span style={{ color:"var(--color-muted)", display:"block", fontSize:"0.82rem" }}>E-mail :</span><strong>{values.email || "—"}</strong></div>
            <div><span style={{ color:"var(--color-muted)", display:"block", fontSize:"0.82rem" }}>Ville :</span><strong>{values.city || "Yaounde"}</strong></div>
          </div>
          <div style={{ borderTop:"1px dashed var(--color-border)", paddingTop:"0.75rem", display:"flex", flexDirection:"column", gap:"0.4rem" }}>
            <div>
              <span style={{ color:"var(--color-muted)", display:"block", fontSize:"0.82rem" }}>Filiere choisie :</span>
              <strong style={{ color:"var(--color-magenta-600)", fontSize:"1.05rem" }}>{selectedFormation ? selectedFormation.title : "Non selectionnee"}</strong>
            </div>
            <div>
              <span style={{ color:"var(--color-muted)", display:"block", fontSize:"0.82rem" }}>Diplome / Niveau vise :</span>
              <strong>{availableDiplomas.find((d) => d.value === values.diplomaInterest)?.label || values.diplomaInterest?.toUpperCase() || "—"}</strong>
            </div>
            <span style={{ display:"block", fontSize:"0.85rem", color:"var(--color-muted)" }}>
              Etablissement : {selectedFormation?.institution === "cfp" ? "CFP NO LIMIT" : "ISSMIGA"}
            </span>
          </div>
          <p style={{ margin:0, fontSize:"0.85rem", color:"var(--color-muted)", fontStyle:"italic" }}>
            En cliquant sur "Confirmer et envoyer", votre preinscription sera transmise a notre secretariat.
          </p>
        </div>
      )}

      <div className={styles.actions}>
        {step > 0 && (
          <Button type="button" variant="outline" onClick={() => setStep((v) => v - 1)}>Precedent</Button>
        )}
        {step < 3 ? (
          <Button type="button" onClick={next}>Continuer</Button>
        ) : (
          <Button type="submit" disabled={isSubmitting || status === "loading"}>
            {status === "loading" ? "Transmission en cours..." : "Confirmer et envoyer la preinscription"}
          </Button>
        )}
      </div>
    </form>
  )
}

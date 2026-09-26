import { PageBody, PageHero } from '../components/layout/PageHero'
import { Seo } from '../components/layout/Seo'
import { languageCertifications, languageLevels, languages } from '../data/languages'
import { LinkButton } from '../components/ui/LinkButton'
import { Card } from '../components/ui/Card'
import styles from '../components/layout/PageHero.module.css'

export function LanguesPage() {
  return (
    <>
      <Seo
        title="Centre de langues"
        description="Allemand, anglais et français au Groupe NO LIMIT. Niveaux A1 à C2. IELTS, TOEFL, TCF, TEF, DALF, Zertifikat."
        path="/langues"
      />
      <PageHero
        title="Centre de langues"
        lede="Maîtrisez une nouvelle langue et ouvrez-vous au monde avec nos programmes intensifs et certifiants."
        crumbs={[
          { to: '/', label: 'Accueil' },
          { label: 'Langues' },
        ]}
      />
      <PageBody>
        <div className={styles.stack}>
          {/* Cartes des Langues avec Images du dossier Assets */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {languages.map((lang) => (
              <Card key={lang.slug} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: '3px solid #f1f5f9'
                }}>
                  <img
                    src={lang.image}
                    alt={`Drapeau ${lang.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>{lang.name}</h3>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {lang.description}
                </p>
                {lang.bonus && (
                  <div style={{
                    marginTop: 'auto',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    color: '#0369a1',
                    fontWeight: '600',
                    width: '100%'
                  }}>
                    ✨ {lang.bonus}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Niveaux organisés par difficulté et persuasion */}
          <section style={{ backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>Votre progression vers la maîtrise</h2>
              <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                Nous utilisons le cadre CECRL pour garantir une reconnaissance internationale de votre niveau.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {languageLevels.map((group) => (
                <div key={group.group}>
                  <div style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#1e293b', margin: 0 }}>{group.group}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.25rem' }}>{group.description}</p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {group.levels.map((level) => (
                      <div key={level.code} style={{
                        background: '#f8fafc',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid #edf2f7',
                        transition: 'transform 0.2s'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <span style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                          }}>
                            {level.code}
                          </span>
                          <span style={{ fontWeight: '700', color: '#334155' }}>{level.label}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                          {level.capability}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Certifications internationales</h2>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {languageCertifications.map((item) => (
                <div key={item.code} style={{
                  padding: '0.75rem 1.5rem',
                  background: '#ffffff',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  {item.code} <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '0.5rem' }}>| {item.language}</span>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <LinkButton to="/preinscription" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
              Rejoindre le centre de langues
            </LinkButton>
          </div>
        </div>
      </PageBody>
    </>
  )
}

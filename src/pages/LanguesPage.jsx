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
        description="Apprenez l'Allemand, l'Anglais et le Français au Groupe NO LIMIT. Niveaux A1 à C2."
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
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  border: '4px solid #fff'
                }}>
                  <img
                    src={lang.image}
                    alt={`Drapeau ${lang.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '1rem' }}>{lang.name}</h3>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
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
                    fontWeight: '700',
                    width: '100%'
                  }}>
                    🎁 {lang.bonus}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Niveaux organisés par difficulté */}
          <section style={{ backgroundColor: '#ffffff', padding: '3.5rem 2rem', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.25rem', color: '#0f172a', marginBottom: '1rem' }}>Votre progression vers le succès</h2>
              <p style={{ color: '#64748b', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                Nous suivons le cadre européen (CECRL) pour vous garantir une certification reconnue partout dans le monde.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {languageLevels.map((group) => (
                <div key={group.group}>
                  <div style={{ marginBottom: '2rem', borderLeft: '5px solid var(--primary)', paddingLeft: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#1e293b', margin: 0 }}>{group.group}</h3>
                    <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>{group.description}</p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                  }}>
                    {group.levels.map((level) => (
                      <div key={level.code} style={{
                        background: '#f8fafc',
                        padding: '2rem',
                        borderRadius: '20px',
                        border: '1px solid #edf2f7',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          <span style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '0.4rem 1rem',
                            borderRadius: '10px',
                            fontWeight: '800',
                            fontSize: '1.1rem'
                          }}>
                            {level.code}
                          </span>
                          <span style={{ fontWeight: '700', color: '#334155', fontSize: '1.1rem' }}>{level.label}</span>
                        </div>
                        <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                          {level.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section style={{ marginTop: '4rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>Préparez vos certifications internationales</h2>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              {languageCertifications.map((item) => (
                <div key={item.code} style={{
                  padding: '1rem 2rem',
                  background: '#fff',
                  border: '2px solid var(--primary)',
                  borderRadius: '16px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'var(--primary)'
                }}>
                  {item.code} <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '400', marginLeft: '0.5rem' }}>({item.language})</span>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <LinkButton to="/preinscription" style={{ padding: '1.25rem 4rem', fontSize: '1.2rem' }}>
              S'inscrire maintenant
            </LinkButton>
          </div>
        </div>
      </PageBody>
    </>
  )
}

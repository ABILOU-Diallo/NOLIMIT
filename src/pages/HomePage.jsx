import { useMemo } from 'react'
import { Seo } from '../components/layout/Seo'
import { Hero } from '../components/sections/Hero'
import { WhySection } from '../components/sections/WhySection'
import { ExploreFormations } from '../components/sections/ExploreFormations'
import { PathFinder } from '../components/sections/PathFinder'
import { LanguagesTeaser } from '../components/sections/LanguagesTeaser'
import { EmployabilityPath } from '../components/sections/EmployabilityPath'
import { InternationalSection } from '../components/sections/InternationalSection'
import { PromoterSection } from '../components/sections/PromoterSection'
import { DiplomaCompare } from '../components/sections/DiplomaCompare'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { PreinscriptionCta } from '../components/sections/PreinscriptionCta'
import { Skeleton } from '../components/ui/Skeleton'
import { Reveal } from '../components/ui/Reveal'
import { Container } from '../components/ui/Container'
import { useAsyncData } from '../hooks/useAsyncData'
import { site } from '../data/site'
import { getFormations, getPoles } from '../services/formationService'
import { getApprovedTestimonials } from '../services/testimonialService'
import { ASYNC } from '../utils/asyncState'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phones && site.phones[0] ? site.phones[0].display : '',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Yaoundé',
    addressCountry: 'CM',
    streetAddress: site.address,
  },
}

const initialCatalog = { poles: [], formations: [], testimonials: [] }

export function HomePage() {
  const { state, data } = useAsyncData(async () => {
    try {
      const [poles, formations, testimonials] = await Promise.all([
        getPoles().catch(() => []),
        getFormations().catch(() => []),
        getApprovedTestimonials().catch(() => []),
      ])
      return { poles, formations, testimonials }
    } catch (err) {
      return initialCatalog
    }
  }, []) // Fix: dependency argument must be an array

  const catalog = useMemo(() => data || initialCatalog, [data])

  return (
    <>
      <Seo
        title={`${site.name} — ${site.signature}`}
        description="Orientation, formation professionnelle et employabilité à Yaoundé. CQP, DQP et centre de langues. Rentrée le 15 octobre 2026."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <Reveal>
        <WhySection />
      </Reveal>
      {state === ASYNC.loading && (!catalog.poles || catalog.poles.length === 0) ? (
        <Container>
          <Skeleton height="16rem" />
        </Container>
      ) : (
        <Reveal>
          <ExploreFormations
            poles={catalog.poles || []}
            formations={catalog.formations || []}
          />
        </Reveal>
      )}
      <Reveal>
        <PathFinder />
      </Reveal>
      <Reveal>
        <LanguagesTeaser />
      </Reveal>
      <Reveal>
        <EmployabilityPath />
      </Reveal>
      <Reveal>
        <InternationalSection />
      </Reveal>
      <Reveal>
        <PromoterSection />
      </Reveal>
      <Reveal>
        <DiplomaCompare />
      </Reveal>
      <Reveal>
        <TestimonialsSection items={catalog.testimonials || []} />
      </Reveal>
      <Reveal>
        <PreinscriptionCta />
      </Reveal>
    </>
  )
}

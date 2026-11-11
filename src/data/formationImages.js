import assistanteDirection from '../assets/formation-assistante-direction.webp'
import secretariatComptable from '../assets/formation-secretariat-comptable.webp'
import douaneTransit from '../assets/formation-douane-transit.webp'
import comptabiliteGestion from '../assets/formation-comptabilite-gestion.webp'
import marketingDigitalEcommerce from '../assets/formation-marketing-digital-ecommerce.webp'
import marketingCommerceVente from '../assets/formation-marketing-commerce-vente.webp'
import gestionLogistiqueTransport from '../assets/formation-gestion-logistique-transport.webp'
import gestionCollectivitesTerritoriales from '../assets/formation-gestion-collectivites-territoriales.webp'
import managementHebergement from '../assets/formation-management-hebergement.webp'
import assurance from '../assets/formation-assurance.webp'
import gestionRessourcesHumaines from '../assets/formation-gestion-ressources-humaines.webp'
import microfinance from '../assets/formation-microfinance.webp'

const formationImages = [
  { image: assistanteDirection, match: /assistante?[\s-].*direction/ },
  { image: secretariatComptable, match: /secretariat[\s-].*comptable/ },
  { image: douaneTransit, match: /douane.*transit/ },
  { image: comptabiliteGestion, match: /comptabilite.*gestion.*entreprises?/ },
  { image: marketingDigitalEcommerce, match: /marketing.*digital.*e[\s-]?commerce/ },
  { image: marketingCommerceVente, match: /marketing.*commerce.*vente/ },
  { image: gestionLogistiqueTransport, match: /(?:gestion[-\s]*)?logistique.*transport|logistics.*transport/ },
  { image: gestionCollectivitesTerritoriales, match: /collectivit.*territorial/ },
  { image: managementHebergement, match: /management.*technique.*hebergement/ },
  { image: assurance, match: /assur|insurance/ },
  { image: gestionRessourcesHumaines, match: /ressources.*humaines/ },
  { image: microfinance, match: /microfinance/ },
]

function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function getFormationImage(formation) {
  const searchText = normalize([formation.id, formation.slug, formation.title].filter(Boolean).join(' '))
  return formationImages.find(({ match }) => match.test(searchText))?.image || null
}

import assistanteDirection from '../assets/formation-assistante-direction.webp'
import secretariatComptable from '../assets/formation-secretariat-comptable.webp'
import douaneTransit from '../assets/formation-douane-transit.webp'
import comptabiliteGestion from '../assets/formation-comptabilite-gestion.webp'
import marketingDigitalEcommerce from '../assets/formation-marketing-digital-ecommerce.webp'
import marketingCommerceVente from '../assets/formation-marketing-commerce-vente.webp'

const formationImages = [
  { image: assistanteDirection, match: /assistante?[\s-].*direction/ },
  { image: secretariatComptable, match: /secretariat[\s-].*comptable/ },
  { image: douaneTransit, match: /douane.*transit/ },
  { image: comptabiliteGestion, match: /comptabilite.*gestion.*entreprises?/ },
  { image: marketingDigitalEcommerce, match: /marketing.*digital.*e[\s-]?commerce/ },
  { image: marketingCommerceVente, match: /marketing.*commerce.*vente/ },
]

function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function getFormationImage(formation) {
  const searchText = normalize(`${formation.slug} ${formation.title}`)
  return formationImages.find(({ match }) => match.test(searchText))?.image || null
}

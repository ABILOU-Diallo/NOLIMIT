import anglaisImg from '../assets/anglais.png'
import allemandImg from '../assets/allemand.png'
import francaisImg from '../assets/francais.png'

export const languages = [
  {
    slug: 'allemand',
    name: 'Allemand',
    image: allemandImg,
    bonus: 'Livre de cours d’allemand offert.',
    description: 'Ouvrez les portes de l\'Europe. L\'allemand est la langue la plus parlée en UE, essentielle pour l\'ingénierie et le commerce.',
  },
  {
    slug: 'anglais',
    name: 'Anglais',
    image: anglaisImg,
    bonus: 'Accès illimité aux ressources audio.',
    description: 'La langue universelle du business, de la technologie et de la science. Un atout indispensable pour une carrière internationale.',
  },
  {
    slug: 'francais',
    name: 'Français',
    image: francaisImg,
    bonus: 'Ateliers d\'expression orale inclus.',
    description: 'Affinez votre communication professionnelle et académique pour briller dans le monde francophone.',
  },
]

export const languageLevels = [
  {
    group: 'Découverte (A1-A2)',
    description: 'Les premiers pas vers l\'autonomie. Idéal pour les voyages et les interactions de base.',
    levels: [
      { code: 'A1', label: 'Débutant', capability: 'Vous comprenez les bases et pouvez vous présenter simplement.' },
      { code: 'A2', label: 'Élémentaire', capability: 'Vous échangez sur des sujets familiers et quotidiens.' },
    ]
  },
  {
    group: 'Indépendance (B1-B2)',
    description: 'Le seuil de l\'employabilité. Vous commencez à travailler et voyager sans assistance.',
    levels: [
      { code: 'B1', label: 'Intermédiaire', capability: 'Vous gérez la plupart des situations rencontrées en voyage et au travail.' },
      { code: 'B2', label: 'Avancé', capability: 'Vous communiquez avec assurance et argumentez sur des sujets complexes.' },
    ]
  },
  {
    group: 'Maîtrise (C1-C2)',
    description: 'L\'excellence académique et professionnelle. Pour les études supérieures et les postes à haute responsabilité.',
    levels: [
      { code: 'C1', label: 'Autonome', capability: 'Vous comprenez des textes longs et exigeants, avec une expression fluide.' },
      { code: 'C2', label: 'Expert', capability: 'Vous maîtrisez toutes les nuances de la langue, comme un locuteur natif.' },
    ]
  }
]

export const languageCertifications = [
  { code: 'IELTS', language: 'anglais' },
  { code: 'TOEFL', language: 'anglais' },
  { code: 'Zertifikat B1/B2', language: 'allemand' },
  { code: 'TCF', language: 'francais' },
  { code: 'TEF', language: 'francais' },
  { code: 'DALF', language: 'francais' },
]

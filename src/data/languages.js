import anglaisImg from '../assets/anglais.png'
import allemandImg from '../assets/allemand.png'
import francaisImg from '../assets/francais.png'

export const languages = [
  {
    slug: 'allemand',
    name: 'Allemand',
    image: allemandImg,
    bonus: 'Livre de cours d’allemand offert.',
    description: 'La langue de l\'ingénierie et de l\'innovation. Essentielle pour vos projets d\'études ou de carrière en Allemagne.',
  },
  {
    slug: 'anglais',
    name: 'Anglais',
    image: anglaisImg,
    bonus: 'Laboratoire de langue inclus.',
    description: 'Le passeport universel pour le business et la technologie. Indispensable pour toute carrière internationale.',
  },
  {
    slug: 'francais',
    name: 'Français',
    image: francaisImg,
    bonus: 'Préparation TCF/TEF offerte.',
    description: 'Perfectionnez votre communication professionnelle et académique pour le Canada et le monde francophone.',
  },
]

export const languageLevels = [
  {
    group: 'Niveaux Débutants (A1-A2)',
    description: 'Posez vos bases. Apprenez à vous présenter et à gérer les situations quotidiennes avec confiance.',
    levels: [
      { code: 'A1', label: 'Introductif', text: 'Compréhension des expressions familières et basiques.' },
      { code: 'A2', label: 'Intermédiaire', text: 'Communication sur des tâches simples et habituelles.' },
    ]
  },
  {
    group: 'Niveaux Indépendants (B1-B2)',
    description: 'Le niveau de l\'emploi. Soyez capable de travailler et de voyager sans barrière linguistique.',
    levels: [
      { code: 'B1', label: 'Seuil', text: 'Gestion de la plupart des situations de voyage et récit d\'événements.' },
      { code: 'B2', label: 'Avancé', text: 'Compréhension de sujets complexes et argumentation fluide.' },
    ]
  },
  {
    group: 'Niveaux Experts (C1-C2)',
    description: 'L\'excellence académique. Maîtrisez les nuances pour les études supérieures et les postes de direction.',
    levels: [
      { code: 'C1', label: 'Autonome', text: 'Expression spontanée et courante sur des sujets sociaux et pro.' },
      { code: 'C2', label: 'Maîtrise', text: 'Compréhension sans effort de tout ce qui est lu ou entendu.' },
    ]
  }
]

export const languageCertifications = [
  { code: 'IELTS/TOEFL', language: 'Anglais' },
  { code: 'Goethe Zertifikat', language: 'Allemand' },
  { code: 'TCF / TEF / DALF', language: 'Français' },
]

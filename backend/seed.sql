-- ==============================================================================
-- DONNÉES INITIALES (SEED) — GROUPE NO LIMIT & ISSMIGA
-- ==============================================================================

-- 1. INSCRIPTION DES ACTUALITÉS PAR DÉFAUT
INSERT INTO public.actualites (title, slug, category, excerpt, content, image_url, status, published_at)
VALUES
(
  'Offre Spéciale Rentrée 2026 : Un Laptop Offert à Chaque Étudiant Inscription à ISSMIGA !',
  'offre-laptop-gratuit-rentree-2026',
  'Vie du campus',
  'Dans le cadre du programme d’excellence et de transformation digitale, tout étudiant inscrit à ISSMIGA reçoit un ordinateur portable professionnel offert.',
  'L’administration d’ISSMIGA et du Groupe NO LIMIT est heureuse d’annoncer le maintien de l’offre exceptionnelle "Un Étudiant inscrit = Un Laptop offert gratuitement" pour la rentrée d’octobre 2026. Cette initiative vise à garantir à chaque apprenant un accès autonome aux outils informatiques modernes dès le premier jour de cours.',
  '/og-image.jpeg',
  'published',
  NOW()
),
(
  'Cérémonie de remise des diplômes CQP & DQP de la promotion précédente',
  'remise-diplomes-cqp-dqp-promotion',
  'Événements',
  'Plus de 150 étudiants et apprenants ont célébré la fin de leur parcours de formation professionnelle au campus d’Emana.',
  'La cérémonie annuelle de remise des diplômes s’est tenue au sein du campus ISSMIGA à Yaoundé. En présence du promoteur Dr Orly Tantchou, des enseignants et des familles, les lauréats ont reçu leurs parchemins CQP et DQP agréés par le MINEFOP.',
  '/og-image.jpeg',
  'published',
  NOW() - INTERVAL '3 days'
),
(
  'Ouverture des préinscriptions pour le cycle BTS, Licence et Master 2026-2027',
  'ouverture-preinscriptions-bts-licence-master',
  'Admissions',
  'Les candidats au cycle supérieur ISSMIGA et aux formations professionnelles CFP NO LIMIT peuvent dès maintenant remplir leur dossier en ligne.',
  'Le Groupe NO LIMIT informe les élèves de terminale, bacheliers et professionnels que les candidatures pour l’année académique 2026-2027 sont officiellement ouvertes. Les cours débuteront le 5 octobre 2026 pour ISSMIGA et le 15 octobre 2026 pour le CFP NO LIMIT.',
  '/og-image.jpeg',
  'published',
  NOW() - INTERVAL '7 days'
);

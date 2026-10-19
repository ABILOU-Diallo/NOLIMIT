/**
 * Service de gestion des modèles d'e-mails pour le Groupe NO LIMIT
 */

const SITE_URL = 'https://www.nolimitacademy.org';

const SIGNATURE = `
---
L'Équipe Administrative
Groupe NO LIMIT — Orientation · Formation · Employabilité
Yaoundé, derrière Tradex Emana
Tel: +237 678 529 675 / +237 699 990 289
Site: www.nolimitacademy.org
`;

export const mailTemplates = {
  /**
   * Confirmation de création de compte par un admin
   */
  welcomeAdminCreated: (fullName, email, role) => {
    const subject = encodeURIComponent(`Bienvenue au Groupe NO LIMIT - Vos accès utilisateur`);
    const body = encodeURIComponent(`Bonjour ${fullName},

Nous avons le plaisir de vous informer qu'un compte a été créé pour vous sur la plateforme du Groupe NO LIMIT en tant que ${role === 'admin' ? 'Administrateur' : 'Étudiant'}.

Vos identifiants de connexion :
- E-mail : ${email}
- Lien d'accès : ${SITE_URL}/connexion

Nous vous recommandons de modifier votre mot de passe dès votre première connexion.

${SIGNATURE}`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  },

  /**
   * Relance pour une préinscription en attente
   */
  preinscriptionFollowup: (fullName, email, formation) => {
    const subject = encodeURIComponent(`Suite à votre préinscription : ${formation}`);
    const body = encodeURIComponent(`Bonjour ${fullName},

Nous avons bien reçu votre dossier de préinscription pour la formation : ${formation}.

Cependant, votre dossier est actuellement incomplet ou nécessite une validation physique de vos pièces justificatives au campus de Yaoundé (Emana).

Pourriez-vous nous indiquer quand vous seriez disponible pour passer nous voir ?

${SIGNATURE}`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  },

  /**
   * Invitation à un entretien d'orientation
   */
  orientationInvite: (fullName, email) => {
    const subject = encodeURIComponent(`Invitation à votre entretien d'orientation - Groupe NO LIMIT`);
    const body = encodeURIComponent(`Bonjour ${fullName},

Suite à votre demande sur notre site, nous souhaiterions vous inviter à un entretien d'orientation (physique ou téléphonique) pour vous aider à affiner votre projet professionnel.

Merci de nous communiquer vos disponibilités pour les 48 prochaines heures.

${SIGNATURE}`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }
};

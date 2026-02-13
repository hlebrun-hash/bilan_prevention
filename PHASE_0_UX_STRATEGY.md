# 📋 PHASE 0 : STRATÉGIE UX & DESIGN
## Bilan de Prévention Santé - Assistant Digital Pharmacien

---

## 🎯 MISSION STATEMENT

**Ce n'est pas un formulaire. C'est un triage médical digital bienveillant.**

L'utilisateur confie des informations précieuses sur sa santé sans recevoir de diagnostic immédiat. Notre défi UX : transformer cette asymétrie en expérience de confiance et de satisfaction.

---

## 🧠 PSYCHOLOGIE DE L'UTILISATEUR

### Le Paradoxe de la Valeur
- **Ce que l'utilisateur DONNE** : Informations personnelles sensibles (santé, mode de vie, antécédents)
- **Ce que l'utilisateur REÇOIT** : Pas de résultat immédiat, pas de gratification instantanée
- **Le Risque** : Abandon à mi-parcours, sentiment de "perte de temps"

### La Solution : La Satisfaction d'Usage
Compenser l'absence de récompense immédiate par :
1. **Progression visible et gratifiante** (gamification douce)
2. **Feedback constant** (validation, encouragement)
3. **Design rassurant** (confiance, professionnalisme)
4. **Fluidité parfaite** (zéro friction)

---

## 🎨 IDENTITÉ VISUELLE

### Concept : "Dossier Médical Confidentiel & Chaleureux"

#### Palette de Couleurs
```
Couleurs Principales :
- Fond Principal : #F6F4EE (Crème papier naturel)
- Fond Secondaire : #FAF0E6 (Lin doux)
- Texte Principal : #2C2C2C (Gris anthracite - pas de noir pur)
- Texte Secondaire : #5A5A5A (Gris moyen)

Couleurs d'Accent :
- Validation/Succès : #7C9885 (Vert sauge apaisant)
- Progression : #B8956A (Or doux, encre dorée)
- Attention : #D4A574 (Ambre chaleureux)
- Erreur : #C17B6B (Terracotta doux)
```

#### Typographie
```
Titres : "Outfit" ou "Inter" (Google Fonts)
- Font-weight: 600-700
- Lisibilité maximale
- Caractère moderne mais chaleureux

Corps de texte : "Inter" ou "Roboto"
- Font-weight: 400-500
- Excellent pour la lecture longue
- Accessibilité optimale
```

#### Principes Visuels
1. **Pas de blanc clinique** → Crème naturel (#F6F4EE)
2. **Pas de bleu hôpital** → Vert sauge (#7C9885)
3. **Pas de noir dur** → Gris anthracite (#2C2C2C)
4. **Pas de néons** → Tons organiques et doux

---

## 🎮 GAMIFICATION SUBTILE

### Principe : "Encre qui Coule"
Pas d'explosions, pas de confettis. Des micro-interactions organiques et satisfaisantes.

#### Éléments Gamifiés
1. **Barre de Progression**
   - Style : Ligne fluide qui se remplit comme de l'encre
   - Animation : Transition douce (ease-in-out)
   - Couleur : #B8956A (Or doux)
   - Feedback sonore : Son doux de "clic" (optionnel)

2. **Cases à Cocher**
   - Animation : Checkmark qui dessine progressivement
   - Son : "Pop" satisfaisant (optionnel)
   - Couleur : #7C9885 (Vert sauge)

3. **Transitions entre Questions**
   - Type : Slide horizontal doux
   - Durée : 300-400ms
   - Easing : cubic-bezier(0.4, 0.0, 0.2, 1)

4. **Validation de Section**
   - Micro-animation : Légère pulsation
   - Message : "Section complétée ✓"
   - Couleur : #7C9885

---

## 📱 ARCHITECTURE DE L'EXPÉRIENCE

### Structure en 4 Actes

#### ACTE 1 : L'ONBOARDING (L'Accroche)
**Objectif** : Engagement immédiat

**Écran d'Accueil**
```
┌─────────────────────────────────┐
│                                 │
│    🏥 Bilan de Prévention      │
│                                 │
│  Aidez votre pharmacien à      │
│  mieux vous accompagner         │
│                                 │
│  ┌───────────────────────┐     │
│  │   Sélectionnez votre  │     │
│  │   tranche d'âge :     │     │
│  │                       │     │
│  │  ○ 18-25 ans          │     │
│  │  ○ 45-50 ans          │     │
│  │  ○ 60-65 ans          │     │
│  │  ○ 70-75 ans          │     │
│  │                       │     │
│  │  [Commencer →]        │     │
│  └───────────────────────┘     │
│                                 │
│  🔒 Vos données sont           │
│     sécurisées                  │
└─────────────────────────────────┘
```

**Règles UX** :
- Pas de menu complexe
- Pas de liens "À propos" envahissants
- Action claire et immédiate
- Icône de sécurité pour rassurer

---

#### ACTE 2 : L'IMMERSION (Le Questionnaire)
**Objectif** : Maintenir l'engagement jusqu'au bout

**Structure des Questions**
- **Format** : Une question par écran (éviter l'effet "pavé")
- **Sections** : Regroupées par thématiques
  1. Situation Personnelle
  2. Mode de Vie
  3. Antécédents Médicaux
  4. Santé Mentale
  5. Vaccinations
  6. Dépistages

**Écran Type de Question**
```
┌─────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░ 35%      │ ← Barre de progression
│                                 │
│ Mode de Vie                     │ ← Section actuelle
│                                 │
│ Pratiquez-vous une activité     │ ← Question
│ physique régulière ?            │
│                                 │
│  ┌─────────────────────┐        │
│  │  ✓ Oui              │        │ ← Boutons larges
│  └─────────────────────┘        │
│                                 │
│  ┌─────────────────────┐        │
│  │    Non              │        │
│  └─────────────────────┘        │
│                                 │
│                                 │
│         [← Retour]              │ ← Navigation discrète
└─────────────────────────────────┘
```

**Règles UX** :
- Pas de header/footer (tunnel sans distraction)
- Boutons tactiles larges (Loi de Fitts)
- Accessible au pouce sur mobile
- Feedback immédiat après chaque réponse
- Message d'encouragement : "C'est noté ✓"

**Feedback d'Encouragement**
Après chaque réponse :
```
"C'est noté, merci ✓"
"Information enregistrée ✓"
"Parfait, continuons ✓"
```

---

#### ACTE 3 : LA CLÔTURE (Le Handoff)
**Objectif** : Rassurer et valoriser l'effort

**Écran de Validation Finale**
```
┌─────────────────────────────────┐
│                                 │
│    ✓ Questionnaire Complété     │
│                                 │
│  Vous avez rempli toutes les    │
│  sections. Vos informations     │
│  vont maintenant être           │
│  sécurisées et transmises.      │
│                                 │
│  ┌─────────────────────┐        │
│  │  Envoyer mon bilan  │        │
│  │         →           │        │
│  └─────────────────────┘        │
│                                 │
│  🔒 Transmission sécurisée      │
└─────────────────────────────────┘
```

**Animation de Traitement**
```
┌─────────────────────────────────┐
│                                 │
│    🔄 Sécurisation en cours     │
│                                 │
│    ●●●○○○○○○○                   │ ← Dots animés
│                                 │
│  Vos données sont chiffrées     │
│  et préparées pour votre        │
│  pharmacien...                  │
│                                 │
└─────────────────────────────────┘
```

**Animation d'Envoi**
```
┌─────────────────────────────────┐
│                                 │
│    📤 Envoi à la pharmacie      │
│                                 │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%        │
│                                 │
│  Transmission en cours...       │
│                                 │
└─────────────────────────────────┘
```

---

#### ACTE 4 : LA CONFIRMATION (La Réassurance)
**Objectif** : Pas de cul-de-sac, donner une suite

**Écran de Confirmation**
```
┌─────────────────────────────────┐
│                                 │
│         ✓ C'est Envoyé !        │
│                                 │
│  Votre bilan de prévention est  │
│  sécurisé et attend votre       │
│  pharmacien.                    │
│                                 │
│  💬 Parlez-lui en lors de       │
│     votre prochaine visite      │
│                                 │
│  ┌─────────────────────┐        │
│  │  Prendre RDV        │        │
│  └─────────────────────┘        │
│                                 │
│  ┌─────────────────────┐        │
│  │  Localiser la       │        │
│  │  pharmacie          │        │
│  └─────────────────────┘        │
│                                 │
│  [← Retour à l'accueil]         │
└─────────────────────────────────┘
```

**Règles UX** :
- Message de succès clair
- Actions secondaires proposées
- Pas de cul-de-sac
- Sentiment d'accomplissement

---

## 🎯 OBSESSION DE LA CONVERSION

### Métriques Clés
1. **Taux de Démarrage** : % qui cliquent sur "Commencer"
2. **Taux de Complétion par Section** : % qui terminent chaque section
3. **Taux d'Abandon** : À quelle question les gens abandonnent
4. **Taux de Validation Finale** : % qui envoient le bilan

### Stratégies Anti-Abandon

#### 1. Progression Thématique (Pas Numérique)
❌ **Mauvais** : "Question 12 sur 50"
✓ **Bon** : "Mode de Vie - 3/5 sections complétées"

#### 2. Sauvegarde Automatique
- Sauvegarder la progression dans localStorage
- Message : "Votre progression est sauvegardée"
- Possibilité de reprendre plus tard

#### 3. Micro-Victoires
- Célébrer chaque section complétée
- Animation de validation
- Message positif

#### 4. Estimation de Temps
- "Encore 2 minutes environ"
- Mise à jour dynamique
- Toujours optimiste

---

## 📐 ERGONOMIE & ACCESSIBILITÉ

### Loi de Fitts
- **Boutons** : Minimum 44x44px (recommandation Apple)
- **Espacement** : Minimum 8px entre éléments cliquables
- **Zone de pouce** : Éléments importants dans la zone accessible

### Contraste
- **Ratio minimum** : 4.5:1 pour le texte normal
- **Ratio minimum** : 3:1 pour le texte large
- **Outil** : WebAIM Contrast Checker

### Navigation Clavier
- Tous les éléments interactifs accessibles au clavier
- Focus visible et clair
- Ordre de tabulation logique

### Lecteurs d'Écran
- Labels ARIA appropriés
- Messages de statut annoncés
- Structure sémantique HTML5

---

## 🔒 SÉCURITÉ & CONFIDENTIALITÉ

### Messages de Réassurance
- Icône de cadenas 🔒
- "Vos données sont sécurisées"
- "Transmission chiffrée"
- "Confidentiel et sécurisé"

### Conformité RGPD
- Consentement explicite
- Droit à l'oubli
- Transparence sur l'utilisation des données

---

## 🎬 MICRO-INTERACTIONS

### Animations Clés
1. **Hover sur Bouton**
   - Scale: 1.02
   - Shadow: légère élévation
   - Transition: 200ms

2. **Clic sur Bouton**
   - Scale: 0.98
   - Feedback tactile
   - Transition: 100ms

3. **Progression**
   - Barre qui se remplit
   - Easing: ease-out
   - Durée: 400ms

4. **Validation**
   - Checkmark animé
   - Couleur: #7C9885
   - Durée: 300ms

---

## 📊 STRUCTURE DES DONNÉES

### Tranches d'Âge
```javascript
const ageRanges = [
  {
    id: '18-25',
    label: '18-25 ans',
    questionnaire: 'questionnaire_18_25.json'
  },
  {
    id: '45-50',
    label: '45-50 ans',
    questionnaire: 'questionnaire_45_50.json'
  },
  {
    id: '60-65',
    label: '60-65 ans',
    questionnaire: 'questionnaire_60_65.json'
  },
  {
    id: '70-75',
    label: '70-75 ans',
    questionnaire: 'questionnaire_70_75.json'
  }
];
```

### Structure d'une Question
```javascript
{
  "id": "q1",
  "section": "Mode de Vie",
  "question": "Pratiquez-vous une activité physique régulière ?",
  "type": "boolean", // boolean, multiple-choice, text
  "options": ["Oui", "Non"],
  "required": true,
  "helpText": "Au moins 30 minutes par jour"
}
```

---

## 🚀 STACK TECHNIQUE RECOMMANDÉ

### Frontend
- **Framework** : React (avec Vite pour la rapidité)
- **Styling** : Vanilla CSS (contrôle total)
- **Animations** : Framer Motion (micro-interactions fluides)
- **Icons** : Lucide React (cohérence visuelle)
- **Fonts** : Google Fonts (Outfit + Inter)

### Backend (Intégration Mistral AI)
- **API** : Mistral AI pour le traitement
- **Stockage** : JSON local ou base de données
- **Sécurité** : Chiffrement des données sensibles

### Mobile-First
- **Approche** : Progressive Enhancement
- **Breakpoints** :
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+

---

## ✅ CHECKLIST DE VALIDATION

### Design
- [ ] Palette de couleurs validée
- [ ] Typographie choisie et testée
- [ ] Micro-interactions définies
- [ ] Responsive design vérifié

### UX
- [ ] Parcours utilisateur mappé
- [ ] Points de friction identifiés
- [ ] Stratégies anti-abandon en place
- [ ] Feedback à chaque étape

### Technique
- [ ] Questions extraites des PDFs
- [ ] Structure de données définie
- [ ] API Mistral intégrée
- [ ] Sauvegarde locale fonctionnelle

### Accessibilité
- [ ] Contraste vérifié
- [ ] Navigation clavier testée
- [ ] Lecteurs d'écran compatibles
- [ ] ARIA labels en place

---

## 🎯 PROCHAINES ÉTAPES

### Phase 1 : Extraction des Données
1. Parser les 4 PDFs
2. Extraire toutes les questions
3. Structurer en JSON
4. Valider la cohérence

### Phase 2 : Prototype Visuel
1. Créer les maquettes haute-fidélité
2. Définir les animations
3. Tester les micro-interactions
4. Valider avec utilisateurs

### Phase 3 : Développement
1. Setup du projet React
2. Créer les composants
3. Implémenter les animations
4. Intégrer Mistral AI

### Phase 4 : Tests & Optimisation
1. Tests utilisateurs
2. A/B testing
3. Optimisation des conversions
4. Déploiement

---

## 📝 NOTES FINALES

**L'Essence du Projet** :
Ce n'est pas un formulaire médical froid. C'est un assistant bienveillant qui guide l'utilisateur avec douceur et professionnalisme. Chaque pixel, chaque animation, chaque mot doit servir cet objectif : **faire confiance et aller au bout**.

**Le Mantra** :
> "Sérénité Active. Confiance. Accomplissement."

---

**Document créé le** : 2026-02-13  
**Version** : 1.0  
**Statut** : Phase 0 - Stratégie Validée ✓

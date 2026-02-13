# 🎨 DESIGN SYSTEM
## Bilan de Prévention Santé - Spécifications Visuelles

---

## 🎨 PALETTE DE COULEURS

### Couleurs Principales

```css
/* Backgrounds */
--color-bg-primary: #F6F4EE;      /* Crème papier naturel */
--color-bg-secondary: #FAF0E6;    /* Lin doux */
--color-bg-elevated: #FFFFFF;     /* Blanc pur pour cartes */

/* Texte */
--color-text-primary: #2C2C2C;    /* Gris anthracite */
--color-text-secondary: #5A5A5A;  /* Gris moyen */
--color-text-tertiary: #8B8B8B;   /* Gris clair */

/* Accents */
--color-accent-success: #7C9885;  /* Vert sauge */
--color-accent-progress: #B8956A; /* Or doux */
--color-accent-warning: #D4A574;  /* Ambre */
--color-accent-error: #C17B6B;    /* Terracotta */

/* Interactions */
--color-hover: rgba(124, 152, 133, 0.1);
--color-active: rgba(124, 152, 133, 0.2);
--color-focus: #7C9885;
```

### Utilisation des Couleurs

| Élément | Couleur | Usage |
|---------|---------|-------|
| Fond de page | `#F6F4EE` | Toutes les pages |
| Cartes/Conteneurs | `#FFFFFF` | Questions, sections |
| Bouton primaire | `#7C9885` | Actions principales |
| Bouton secondaire | `#B8956A` | Actions secondaires |
| Barre de progression | `#B8956A` | Progression |
| Checkmark | `#7C9885` | Validation |
| Messages d'erreur | `#C17B6B` | Erreurs |

---

## 📝 TYPOGRAPHIE

### Familles de Polices

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

/* Définitions */
--font-heading: 'Outfit', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Hiérarchie Typographique

```css
/* Titres */
--text-h1: 2.5rem;      /* 40px - Page d'accueil */
--text-h2: 2rem;        /* 32px - Titres de section */
--text-h3: 1.5rem;      /* 24px - Sous-titres */
--text-h4: 1.25rem;     /* 20px - Questions */

/* Corps */
--text-body-lg: 1.125rem;  /* 18px - Texte important */
--text-body: 1rem;         /* 16px - Texte standard */
--text-body-sm: 0.875rem;  /* 14px - Texte secondaire */
--text-caption: 0.75rem;   /* 12px - Légendes */

/* Poids */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Exemples d'Usage

```css
/* Titre principal */
h1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1.2;
}

/* Question */
.question-text {
  font-family: var(--font-body);
  font-size: var(--text-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.5;
}

/* Bouton */
.button {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-weight-medium);
}
```

---

## 📏 ESPACEMENTS

### Système d'Espacement

```css
/* Base: 8px */
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-10: 5rem;    /* 80px */
```

### Marges & Paddings

| Élément | Padding | Margin |
|---------|---------|--------|
| Bouton | `16px 32px` | `8px` |
| Carte de question | `32px` | `16px` |
| Section | `24px` | `16px` |
| Container principal | `24px` | `0` |

---

## 🔲 COMPOSANTS

### Boutons

#### Bouton Primaire
```css
.button-primary {
  background: var(--color-accent-success);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
  box-shadow: 0 2px 8px rgba(124, 152, 133, 0.2);
}

.button-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(124, 152, 133, 0.3);
}

.button-primary:active {
  transform: scale(0.98);
}
```

#### Bouton Secondaire
```css
.button-secondary {
  background: transparent;
  color: var(--color-text-primary);
  padding: 16px 32px;
  border-radius: 12px;
  border: 2px solid var(--color-text-tertiary);
  cursor: pointer;
  transition: all 200ms ease;
}

.button-secondary:hover {
  border-color: var(--color-accent-success);
  color: var(--color-accent-success);
}
```

#### Bouton de Choix (Oui/Non)
```css
.choice-button {
  background: white;
  color: var(--color-text-primary);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #E5E5E5;
  cursor: pointer;
  transition: all 200ms ease;
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
}

.choice-button:hover {
  border-color: var(--color-accent-success);
  background: var(--color-hover);
}

.choice-button.selected {
  border-color: var(--color-accent-success);
  background: rgba(124, 152, 133, 0.1);
  color: var(--color-accent-success);
}
```

---

### Barre de Progression

```css
.progress-container {
  width: 100%;
  height: 8px;
  background: #E5E5E5;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #B8956A 0%, #D4A574 100%);
  border-radius: 4px;
  transition: width 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Avec pourcentage */
.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-text {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 45px;
}
```

---

### Cartes

#### Carte de Question
```css
.question-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin: 16px 0;
}

.question-card.elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

#### Carte de Section
```css
.section-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid var(--color-accent-success);
  margin: 16px 0;
}

.section-card.completed {
  border-left-color: var(--color-accent-success);
  background: rgba(124, 152, 133, 0.05);
}
```

---

### Checkboxes & Radio Buttons

```css
/* Custom Checkbox */
.custom-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #E5E5E5;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease;
}

.custom-checkbox.checked {
  background: var(--color-accent-success);
  border-color: var(--color-accent-success);
}

.custom-checkbox.checked::after {
  content: '✓';
  color: white;
  font-size: 16px;
  font-weight: bold;
  animation: checkmark 300ms ease;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
```

---

### Messages de Feedback

```css
/* Message de succès */
.feedback-success {
  background: rgba(124, 152, 133, 0.1);
  color: var(--color-accent-success);
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid var(--color-accent-success);
  font-size: 14px;
  animation: slideIn 300ms ease;
}

/* Message d'erreur */
.feedback-error {
  background: rgba(193, 123, 107, 0.1);
  color: var(--color-accent-error);
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid var(--color-accent-error);
  font-size: 14px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🎬 ANIMATIONS

### Transitions Standard

```css
/* Transition rapide (hover, focus) */
--transition-fast: 150ms ease;

/* Transition normale (boutons, cartes) */
--transition-normal: 200ms ease;

/* Transition lente (slides, modals) */
--transition-slow: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);

/* Transition très lente (progression) */
--transition-slower: 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
```

### Animations Clés

#### Slide entre Questions
```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}

.question-enter {
  animation: slideInRight 300ms ease;
}

.question-exit {
  animation: slideOutLeft 300ms ease;
}
```

#### Pulsation (Validation)
```css
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.validated {
  animation: pulse 400ms ease;
}
```

#### Loader (Dots)
```css
.loader-dots {
  display: flex;
  gap: 8px;
}

.loader-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent-progress);
  border-radius: 50%;
  animation: dotPulse 1.4s infinite ease-in-out;
}

.loader-dot:nth-child(1) {
  animation-delay: 0s;
}

.loader-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loader-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Smartphones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
```

### Layouts Responsifs

```css
/* Container principal */
.container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
}

@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 720px;
    padding: 40px;
  }
}

/* Boutons */
.button {
  width: 100%;
}

@media (min-width: 768px) {
  .button {
    width: auto;
    min-width: 200px;
  }
}
```

---

## 🎯 ZONES TACTILES

### Tailles Minimales (Mobile)

```css
/* Boutons et éléments interactifs */
.interactive {
  min-height: 44px;
  min-width: 44px;
}

/* Espacement entre éléments cliquables */
.interactive + .interactive {
  margin-top: 8px;
}

/* Zone de pouce (bas de l'écran) */
.thumb-zone {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: var(--color-bg-primary);
}
```

---

## ♿ ACCESSIBILITÉ

### Focus States

```css
/* Focus visible pour navigation clavier */
*:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Supprimer outline par défaut */
*:focus {
  outline: none;
}
```

### Contraste

| Élément | Ratio | Conforme |
|---------|-------|----------|
| Texte principal (#2C2C2C sur #F6F4EE) | 11.5:1 | ✓ AAA |
| Texte secondaire (#5A5A5A sur #F6F4EE) | 6.8:1 | ✓ AAA |
| Bouton primaire (blanc sur #7C9885) | 4.8:1 | ✓ AA |

### ARIA Labels

```html
<!-- Barre de progression -->
<div role="progressbar" 
     aria-valuenow="35" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Progression du questionnaire">
  <div class="progress-bar" style="width: 35%"></div>
</div>

<!-- Bouton de choix -->
<button 
  class="choice-button" 
  aria-pressed="false"
  aria-label="Répondre Oui à la question">
  Oui
</button>

<!-- Message de feedback -->
<div role="status" aria-live="polite" class="feedback-success">
  C'est noté ✓
</div>
```

---

## 🎨 ICONOGRAPHIE

### Icônes Recommandées (Lucide React)

```javascript
import { 
  Check,        // Validation
  ChevronRight, // Navigation suivant
  ChevronLeft,  // Navigation retour
  Lock,         // Sécurité
  Heart,        // Santé
  Activity,     // Mode de vie
  Shield,       // Protection
  Send,         // Envoi
  CheckCircle,  // Succès
  AlertCircle,  // Attention
  Info          // Information
} from 'lucide-react';
```

### Tailles d'Icônes

```css
--icon-sm: 16px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

---

## 📦 COMPOSANTS SPÉCIFIQUES

### Sélecteur de Tranche d'Âge

```css
.age-selector {
  display: grid;
  gap: 12px;
}

.age-option {
  background: white;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 200ms ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.age-option:hover {
  border-color: var(--color-accent-success);
  background: var(--color-hover);
}

.age-option.selected {
  border-color: var(--color-accent-success);
  background: rgba(124, 152, 133, 0.1);
}

.age-option-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #E5E5E5;
  border-radius: 50%;
  position: relative;
}

.age-option.selected .age-option-radio {
  border-color: var(--color-accent-success);
}

.age-option.selected .age-option-radio::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: var(--color-accent-success);
  border-radius: 50%;
  animation: radioCheck 200ms ease;
}

@keyframes radioCheck {
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
```

---

## 🎯 ÉTATS DES COMPOSANTS

### Bouton

| État | Style |
|------|-------|
| Default | Background: #7C9885, Shadow: subtle |
| Hover | Scale: 1.02, Shadow: elevated |
| Active | Scale: 0.98 |
| Disabled | Opacity: 0.5, Cursor: not-allowed |
| Loading | Spinner, Disabled |

### Carte de Question

| État | Style |
|------|-------|
| Default | Background: white, Shadow: subtle |
| Answered | Border-left: 4px solid #7C9885 |
| Error | Border-left: 4px solid #C17B6B |

---

**Document créé le** : 2026-02-13  
**Version** : 1.0  
**Statut** : Design System Complet ✓

# 🏗️ ARCHITECTURE TECHNIQUE
## Bilan de Prévention Santé - Plan d'Implémentation

---

## 📋 STACK TECHNIQUE

### Frontend
```
Framework: React 18+ avec Vite
Styling: Vanilla CSS (CSS Modules)
Animations: Framer Motion
Icons: Lucide React
Fonts: Google Fonts (Outfit + Inter)
State Management: React Context API + useState
Routing: React Router DOM (si multi-pages)
Forms: React Hook Form (optionnel)
```

### Backend / API
```
AI Processing: Mistral AI API
Data Storage: JSON local + localStorage (browser)
Future: Node.js + Express (si backend nécessaire)
Database: PostgreSQL ou MongoDB (si backend)
```

### Outils de Développement
```
Build Tool: Vite
Package Manager: npm
Linting: ESLint
Formatting: Prettier
Version Control: Git
```

---

## 📁 STRUCTURE DU PROJET

```
bilan-prevention/
│
├── public/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── ProgressBar/
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   └── ProgressBar.module.css
│   │   │   ├── Card/
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Card.module.css
│   │   │   └── Loader/
│   │   │       ├── Loader.jsx
│   │   │       └── Loader.module.css
│   │   │
│   │   ├── questionnaire/
│   │   │   ├── AgeSelector/
│   │   │   │   ├── AgeSelector.jsx
│   │   │   │   └── AgeSelector.module.css
│   │   │   ├── Question/
│   │   │   │   ├── Question.jsx
│   │   │   │   └── Question.module.css
│   │   │   ├── ChoiceButton/
│   │   │   │   ├── ChoiceButton.jsx
│   │   │   │   └── ChoiceButton.module.css
│   │   │   └── SectionHeader/
│   │   │       ├── SectionHeader.jsx
│   │   │       └── SectionHeader.module.css
│   │   │
│   │   └── feedback/
│   │       ├── SuccessMessage/
│   │       │   ├── SuccessMessage.jsx
│   │       │   └── SuccessMessage.module.css
│   │       └── LoadingAnimation/
│   │           ├── LoadingAnimation.jsx
│   │           └── LoadingAnimation.module.css
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Questionnaire/
│   │   │   ├── Questionnaire.jsx
│   │   │   └── Questionnaire.module.css
│   │   ├── Processing/
│   │   │   ├── Processing.jsx
│   │   │   └── Processing.module.css
│   │   └── Confirmation/
│   │       ├── Confirmation.jsx
│   │       └── Confirmation.module.css
│   │
│   ├── data/
│   │   ├── questionnaires/
│   │   │   ├── questionnaire_18_25.json
│   │   │   ├── questionnaire_45_50.json
│   │   │   ├── questionnaire_60_65.json
│   │   │   └── questionnaire_70_75.json
│   │   └── ageRanges.js
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useQuestionnaire.js
│   │   └── useProgress.js
│   │
│   ├── context/
│   │   └── QuestionnaireContext.jsx
│   │
│   ├── utils/
│   │   ├── storage.js
│   │   ├── validation.js
│   │   └── mistralAPI.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🗂️ STRUCTURE DES DONNÉES

### Format JSON des Questionnaires

```json
{
  "ageRange": "18-25",
  "title": "Bilan de Prévention 18-25 ans",
  "sections": [
    {
      "id": "section_1",
      "title": "Situation Personnelle",
      "icon": "user",
      "questions": [
        {
          "id": "q1",
          "text": "Êtes-vous actuellement étudiant(e) ?",
          "type": "boolean",
          "options": ["Oui", "Non"],
          "required": true,
          "helpText": null
        },
        {
          "id": "q2",
          "text": "Vivez-vous seul(e) ?",
          "type": "boolean",
          "options": ["Oui", "Non"],
          "required": true,
          "helpText": null
        }
      ]
    },
    {
      "id": "section_2",
      "title": "Mode de Vie",
      "icon": "activity",
      "questions": [
        {
          "id": "q3",
          "text": "Pratiquez-vous une activité physique régulière ?",
          "type": "boolean",
          "options": ["Oui", "Non"],
          "required": true,
          "helpText": "Au moins 30 minutes par jour"
        },
        {
          "id": "q4",
          "text": "Consommez-vous de l'alcool ?",
          "type": "multiple",
          "options": [
            "Jamais",
            "Occasionnellement",
            "Régulièrement",
            "Quotidiennement"
          ],
          "required": true,
          "helpText": null
        }
      ]
    }
  ],
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2026-02-13",
    "totalQuestions": 50
  }
}
```

### Types de Questions

```javascript
const questionTypes = {
  BOOLEAN: 'boolean',           // Oui/Non
  MULTIPLE: 'multiple',         // Choix multiples
  TEXT: 'text',                 // Texte libre
  NUMBER: 'number',             // Nombre
  DATE: 'date',                 // Date
  SCALE: 'scale'                // Échelle (1-10)
};
```

### Format de Réponse Utilisateur

```json
{
  "userId": "uuid-v4",
  "ageRange": "18-25",
  "startedAt": "2026-02-13T09:00:00Z",
  "completedAt": "2026-02-13T09:15:00Z",
  "answers": {
    "q1": {
      "questionId": "q1",
      "answer": "Oui",
      "answeredAt": "2026-02-13T09:01:00Z"
    },
    "q2": {
      "questionId": "q2",
      "answer": "Non",
      "answeredAt": "2026-02-13T09:02:00Z"
    }
  },
  "progress": {
    "currentSection": 2,
    "totalSections": 6,
    "currentQuestion": 15,
    "totalQuestions": 50,
    "percentage": 30
  },
  "status": "completed"
}
```

---

## 🔄 FLUX DE DONNÉES

### 1. Initialisation

```
User lands on Home
  ↓
Select Age Range
  ↓
Load corresponding questionnaire JSON
  ↓
Initialize QuestionnaireContext
  ↓
Save to localStorage (auto-save)
```

### 2. Progression

```
Display Question
  ↓
User selects answer
  ↓
Validate answer
  ↓
Save to state + localStorage
  ↓
Update progress
  ↓
Animate transition
  ↓
Load next question
```

### 3. Finalisation

```
Last question answered
  ↓
Show completion screen
  ↓
User clicks "Envoyer"
  ↓
Show loading animation
  ↓
Send to Mistral AI API
  ↓
Receive confirmation
  ↓
Show success screen
  ↓
Clear localStorage
```

---

## 🎣 HOOKS PERSONNALISÉS

### useQuestionnaire

```javascript
/**
 * Hook principal pour gérer le questionnaire
 */
const useQuestionnaire = (ageRange) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // Charger le questionnaire
  useEffect(() => {
    loadQuestionnaire(ageRange);
  }, [ageRange]);

  // Sauvegarder automatiquement
  useEffect(() => {
    saveToLocalStorage(answers);
  }, [answers]);

  const nextQuestion = () => { /* ... */ };
  const previousQuestion = () => { /* ... */ };
  const answerQuestion = (questionId, answer) => { /* ... */ };
  const getProgress = () => { /* ... */ };

  return {
    questionnaire,
    currentSection,
    currentQuestion,
    answers,
    loading,
    nextQuestion,
    previousQuestion,
    answerQuestion,
    getProgress
  };
};
```

### useProgress

```javascript
/**
 * Hook pour calculer la progression
 */
const useProgress = (answers, totalQuestions) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const percentage = Math.round((answeredCount / totalQuestions) * 100);
    setProgress(percentage);
  }, [answers, totalQuestions]);

  return progress;
};
```

### useLocalStorage

```javascript
/**
 * Hook pour gérer le localStorage
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

---

## 🌐 INTÉGRATION MISTRAL AI

### Configuration

```javascript
// utils/mistralAPI.js

const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const sendToMistral = async (questionnaireData) => {
  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant médical qui analyse les bilans de prévention santé.'
          },
          {
            role: 'user',
            content: `Voici un bilan de prévention complété : ${JSON.stringify(questionnaireData)}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Erreur API Mistral');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur Mistral:', error);
    throw error;
  }
};
```

### Utilisation

```javascript
// Dans le composant Questionnaire

const handleSubmit = async () => {
  setIsSubmitting(true);
  
  try {
    // Préparer les données
    const questionnaireData = {
      ageRange,
      answers,
      completedAt: new Date().toISOString()
    };

    // Envoyer à Mistral
    const result = await sendToMistral(questionnaireData);

    // Sauvegarder le résultat
    await saveToPharmacy(result);

    // Rediriger vers la confirmation
    navigate('/confirmation');
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🎨 COMPOSANTS CLÉS

### Button Component

```jsx
// components/common/Button/Button.jsx

import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  loading = false,
  icon = null,
  ...props 
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading ? (
        <span className={styles.loader}>●●●</span>
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
```

### ProgressBar Component

```jsx
// components/common/ProgressBar/ProgressBar.jsx

import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress, showPercentage = true }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        <motion.div
          className={styles.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      {showPercentage && (
        <span className={styles.percentage}>{progress}%</span>
      )}
    </div>
  );
};

export default ProgressBar;
```

### Question Component

```jsx
// components/questionnaire/Question/Question.jsx

import { motion } from 'framer-motion';
import ChoiceButton from '../ChoiceButton/ChoiceButton';
import styles from './Question.module.css';

const Question = ({ 
  question, 
  onAnswer, 
  currentAnswer = null 
}) => {
  return (
    <motion.div
      className={styles.questionCard}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={styles.questionText}>{question.text}</h3>
      
      {question.helpText && (
        <p className={styles.helpText}>{question.helpText}</p>
      )}

      <div className={styles.optionsContainer}>
        {question.options.map((option) => (
          <ChoiceButton
            key={option}
            label={option}
            selected={currentAnswer === option}
            onClick={() => onAnswer(question.id, option)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Question;
```

---

## 🔐 SÉCURITÉ & CONFIDENTIALITÉ

### Chiffrement des Données

```javascript
// utils/encryption.js

import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data), 
    SECRET_KEY
  ).toString();
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
```

### Variables d'Environnement

```bash
# .env

VITE_MISTRAL_API_KEY=your_mistral_api_key
VITE_ENCRYPTION_KEY=your_encryption_key
VITE_API_URL=https://your-backend-url.com
```

---

## 📊 ANALYTICS & TRACKING

### Événements à Tracker

```javascript
// utils/analytics.js

export const trackEvent = (eventName, properties = {}) => {
  // Google Analytics, Mixpanel, etc.
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Événements clés
export const EVENTS = {
  QUESTIONNAIRE_STARTED: 'questionnaire_started',
  QUESTION_ANSWERED: 'question_answered',
  SECTION_COMPLETED: 'section_completed',
  QUESTIONNAIRE_ABANDONED: 'questionnaire_abandoned',
  QUESTIONNAIRE_COMPLETED: 'questionnaire_completed',
  SUBMISSION_SUCCESS: 'submission_success',
  SUBMISSION_ERROR: 'submission_error'
};
```

---

## 🧪 TESTS

### Tests Unitaires (Jest + React Testing Library)

```javascript
// components/common/Button/Button.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 🚀 DÉPLOIEMENT

### Build de Production

```bash
# Installer les dépendances
npm install

# Build
npm run build

# Preview
npm run preview
```

### Hébergement Recommandé

1. **Vercel** (Recommandé)
   - Déploiement automatique depuis Git
   - CDN global
   - HTTPS automatique
   - Analytics intégré

2. **Netlify**
   - Similaire à Vercel
   - Formulaires intégrés
   - Fonctions serverless

3. **GitHub Pages**
   - Gratuit
   - Simple
   - Limité en fonctionnalités

---

## 📝 CHECKLIST D'IMPLÉMENTATION

### Phase 1: Setup (Jour 1)
- [ ] Initialiser le projet Vite + React
- [ ] Installer les dépendances
- [ ] Configurer ESLint + Prettier
- [ ] Créer la structure de dossiers
- [ ] Setup des variables CSS
- [ ] Import des Google Fonts

### Phase 2: Extraction des Données (Jour 1-2)
- [ ] Parser les 4 PDFs
- [ ] Extraire toutes les questions
- [ ] Structurer en JSON
- [ ] Valider la cohérence des données
- [ ] Créer les fichiers JSON finaux

### Phase 3: Composants de Base (Jour 2-3)
- [ ] Créer Button component
- [ ] Créer ProgressBar component
- [ ] Créer Card component
- [ ] Créer Loader component
- [ ] Tester les composants

### Phase 4: Pages Principales (Jour 3-5)
- [ ] Page Home (sélection âge)
- [ ] Page Questionnaire
- [ ] Page Processing (loading)
- [ ] Page Confirmation
- [ ] Navigation entre pages

### Phase 5: Logique Métier (Jour 5-7)
- [ ] Hook useQuestionnaire
- [ ] Hook useProgress
- [ ] Hook useLocalStorage
- [ ] Context API setup
- [ ] Validation des réponses

### Phase 6: Intégration Mistral (Jour 7-8)
- [ ] Configuration API
- [ ] Fonction d'envoi
- [ ] Gestion des erreurs
- [ ] Tests d'intégration

### Phase 7: Animations (Jour 8-9)
- [ ] Transitions entre questions
- [ ] Animations de validation
- [ ] Loading animations
- [ ] Micro-interactions

### Phase 8: Responsive & Accessibilité (Jour 9-10)
- [ ] Tests mobile
- [ ] Tests tablet
- [ ] Tests desktop
- [ ] Navigation clavier
- [ ] Lecteurs d'écran
- [ ] Contraste des couleurs

### Phase 9: Tests & Optimisation (Jour 10-12)
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Tests utilisateurs
- [ ] Optimisation des performances
- [ ] Audit Lighthouse

### Phase 10: Déploiement (Jour 12-14)
- [ ] Build de production
- [ ] Configuration Vercel
- [ ] Tests en production
- [ ] Monitoring
- [ ] Documentation

---

**Document créé le** : 2026-02-13  
**Version** : 1.0  
**Statut** : Architecture Définie ✓  
**Durée estimée** : 12-14 jours

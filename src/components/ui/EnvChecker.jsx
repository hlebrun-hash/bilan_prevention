// Composant pour afficher un avertissement si les variables d'environnement sont manquantes
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function EnvChecker() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const mistralKey = import.meta.env.VITE_MISTRAL_API_KEY;

    const missingVars = [];
    if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
    if (!supabaseKey) missingVars.push('VITE_SUPABASE_ANON_KEY');
    if (!mistralKey) missingVars.push('VITE_MISTRAL_API_KEY');

    // Afficher les variables disponibles dans la console
    console.group('🔍 Configuration des variables d\'environnement');
    console.log('VITE_SUPABASE_URL:', supabaseUrl || '❌ MANQUANT');
    console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Défini' : '❌ MANQUANT');
    console.log('VITE_MISTRAL_API_KEY:', mistralKey ? '✅ Défini' : '❌ MANQUANT');
    console.log('Toutes les variables env:', import.meta.env);
    console.groupEnd();

    if (missingVars.length === 0) {
        return null; // Tout va bien
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            maxWidth: '400px',
            background: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999
        }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <AlertTriangle size={24} color="#ff9800" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#856404' }}>
                        Configuration manquante
                    </h4>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#856404' }}>
                        Les variables d'environnement suivantes sont manquantes :
                    </p>
                    <ul style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#856404' }}>
                        {missingVars.map(varName => (
                            <li key={varName}><code>{varName}</code></li>
                        ))}
                    </ul>
                    <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.75rem', color: '#856404' }}>
                        Configurez-les dans les paramètres Vercel.
                    </p>
                </div>
            </div>
        </div>
    );
}

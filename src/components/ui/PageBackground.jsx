
import React from 'react';

/**
 * Composant d'arrière-plan avec un effet de lueur douce.
 * Adapté pour le thème médical/pharmacie (vert doux).
 */
export const PageBackground = ({ children }) => {
    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                backgroundColor: 'var(--color-bg-primary)', // Couleur de fond existante
                overflowX: 'hidden', // Évite le scroll horizontal
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Lueur douce (Soft Glow) - Vert apaisant */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    // Utilisation d'un vert très doux (basé sur --color-accent-success #7C9885)
                    backgroundImage: `radial-gradient(circle at 50% 30%, rgba(124, 152, 133, 0.15) 0%, transparent 60%)`,
                    opacity: 1,
                    pointerEvents: 'none',
                }}
            />

            {/* Contenu de la page */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </div>
        </div>
    );
};

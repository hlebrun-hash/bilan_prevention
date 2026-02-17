
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("⚠️ ERREUR CRITIQUE: Les identifiants Supabase sont manquants!")
    console.error("VITE_SUPABASE_URL:", supabaseUrl)
    console.error("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "défini" : "undefined")
}

// Utiliser des valeurs par défaut pour éviter le crash (mais ça ne fonctionnera pas pour de vrai)
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PageBackground } from './components/ui/PageBackground.jsx'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PageBackground>
            <App />
            <Analytics />
        </PageBackground>
    </React.StrictMode>,
)

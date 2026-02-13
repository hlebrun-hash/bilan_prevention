import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PageBackground } from './components/ui/PageBackground.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PageBackground>
            <App />
        </PageBackground>
    </React.StrictMode>,
)

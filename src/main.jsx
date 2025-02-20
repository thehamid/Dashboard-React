import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './contexts/app-context.jsx'

createRoot(document.getElementById('root')).render(
    <AppProvider>
        <App /> 
    </AppProvider>
   
)

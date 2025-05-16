import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/main.css'
import '../css/menu.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

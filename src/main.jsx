import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Menu from './views/Menu.jsx'
import "./assets/css/index.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Menu />
  </StrictMode>,
)

//Strict mode hace todo dos veces, ayudando a detectar bugs, solo para desarrollo
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/index.css";
import App from './App.jsx';
import { EmpresaProvider } from "./contexts/EmpresaContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmpresaProvider>
      <App />
    </EmpresaProvider>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { StoreProvider } from './hooks/useGlobalReducer.jsx';


createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </StoreProvider>
)

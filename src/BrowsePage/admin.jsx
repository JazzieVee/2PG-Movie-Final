import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Browse from "./Browse.jsx";


createRoot(document.getElementById('admin-root')).render(
  <StrictMode>
    <Browse />
  </StrictMode>,
)
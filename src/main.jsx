import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { moveNumericCaretToEnd } from './utils/numericInput.js'

const rootElement = document.getElementById('root')
rootElement.addEventListener('focusin', moveNumericCaretToEnd)
rootElement.addEventListener('click', moveNumericCaretToEnd)

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

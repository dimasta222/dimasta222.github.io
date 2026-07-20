import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { focusNumericInputAtEnd, moveNumericCaretToEnd } from './utils/numericInput.js'

const rootElement = document.getElementById('root')
rootElement.addEventListener('pointerdown', focusNumericInputAtEnd, { capture: true })
rootElement.addEventListener('touchstart', focusNumericInputAtEnd, { capture: true, passive: true })
rootElement.addEventListener('focusin', moveNumericCaretToEnd)
rootElement.addEventListener('click', moveNumericCaretToEnd)

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

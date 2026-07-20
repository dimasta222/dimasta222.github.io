import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { focusNumericInputAtEnd, moveNumericCaretToEnd } from './utils/numericInput.js'

const rootElement = document.getElementById('root')
if ('PointerEvent' in window) {
  rootElement.addEventListener('pointerdown', focusNumericInputAtEnd, { capture: true, passive: false })
} else {
  rootElement.addEventListener('touchstart', focusNumericInputAtEnd, { capture: true, passive: false })
  rootElement.addEventListener('mousedown', focusNumericInputAtEnd, { capture: true })
}
rootElement.addEventListener('focusin', moveNumericCaretToEnd)

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

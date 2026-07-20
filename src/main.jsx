import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {
  beginNumericCaretLock,
  cancelNumericCaretLock,
  cancelNumericCaretLockOnMove,
  enforceNumericCaretLock,
  moveNumericCaretToEnd,
  settleNumericCaretLock,
} from './utils/numericInput.js'

const rootElement = document.getElementById('root')
if ('PointerEvent' in window) {
  rootElement.addEventListener('pointerdown', beginNumericCaretLock, { capture: true, passive: true })
  rootElement.addEventListener('pointermove', cancelNumericCaretLockOnMove, { capture: true, passive: true })
  rootElement.addEventListener('pointerup', settleNumericCaretLock, { capture: true, passive: true })
  rootElement.addEventListener('pointercancel', cancelNumericCaretLock, { capture: true })
} else {
  rootElement.addEventListener('touchstart', beginNumericCaretLock, { capture: true, passive: true })
  rootElement.addEventListener('touchmove', cancelNumericCaretLockOnMove, { capture: true, passive: true })
  rootElement.addEventListener('touchcancel', cancelNumericCaretLock, { capture: true })
  rootElement.addEventListener('mousedown', beginNumericCaretLock, { capture: true })
  rootElement.addEventListener('mouseup', settleNumericCaretLock, { capture: true })
}
rootElement.addEventListener('touchend', settleNumericCaretLock, { capture: true, passive: true })
rootElement.addEventListener('click', settleNumericCaretLock, { capture: true })
rootElement.addEventListener('focusin', moveNumericCaretToEnd)
rootElement.addEventListener('focusout', cancelNumericCaretLock)
rootElement.addEventListener('beforeinput', cancelNumericCaretLock, { capture: true })
rootElement.addEventListener('input', cancelNumericCaretLock, { capture: true })
rootElement.addEventListener('keydown', cancelNumericCaretLock, { capture: true })
rootElement.addEventListener('compositionstart', cancelNumericCaretLock, { capture: true })
rootElement.addEventListener('contextmenu', cancelNumericCaretLock, { capture: true })
document.addEventListener('selectionchange', enforceNumericCaretLock, { capture: true })

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

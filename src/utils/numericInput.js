// input[type="number"] does not expose selectionStart/setSelectionRange
// consistently on mobile browsers. Calculator fields use text inputs with a
// numeric keyboard, so the caret can be placed reliably after the value.
function getNumericInput(event) {
  const candidates = [event?.target, event?.currentTarget];
  const input = candidates.find((node) => node instanceof HTMLInputElement);
  if (!input || input.readOnly || input.disabled) return null;
  if (!input.hasAttribute("data-caret-end")) return null;
  const inputMode = input.inputMode || input.getAttribute("inputmode");
  if (input.type !== "number" && inputMode !== "numeric" && inputMode !== "decimal") return null;
  return input;
}

function setCaretAtValueEnd(input) {
  if (!input?.isConnected || document.activeElement !== input) return;
  const end = String(input.value ?? "").length;
  try {
    input.setSelectionRange(end, end, "none");
  } catch {
    // Older embedded browsers may still reject the selection API.
  }
}

function queueCaretPlacement(input) {
  const move = () => setCaretAtValueEnd(input);

  move();
  if (typeof queueMicrotask === "function") {
    queueMicrotask(move);
  }
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      move();
      requestAnimationFrame(move);
    });
  }
}

const CARET_LOCK_MS = 800;
const CARET_MOVE_TOLERANCE = 12;

let activeCaretLock = null;
let caretLockTimer = null;

function getEventPoint(event) {
  const touch = event?.touches?.[0] || event?.changedTouches?.[0];
  const clientX = touch?.clientX ?? event?.clientX;
  const clientY = touch?.clientY ?? event?.clientY;
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return null;
  return { clientX, clientY };
}

function clearCaretLock() {
  if (caretLockTimer !== null) {
    clearTimeout(caretLockTimer);
    caretLockTimer = null;
  }
  activeCaretLock = null;
}

function scheduleCaretLockRelease() {
  if (caretLockTimer !== null) clearTimeout(caretLockTimer);
  caretLockTimer = setTimeout(clearCaretLock, CARET_LOCK_MS);
}

function armCaretLock(input, event) {
  clearCaretLock();
  activeCaretLock = {
    input,
    pointerId: Number.isFinite(event?.pointerId) ? event.pointerId : null,
    startPoint: getEventPoint(event),
  };
  scheduleCaretLockRelease();
}

function isActiveCaretLock(input) {
  return Boolean(activeCaretLock && activeCaretLock.input === input);
}

// iOS Safari may change the input selection twice for one tap: once while the
// field receives focus and again when the native tap handling finishes. Keep a
// short-lived lock so the second selectionchange cannot move the caret back to
// the finger position. The lock is released before any actual text input.
export function beginNumericCaretLock(event) {
  const input = getNumericInput(event);
  if (!input) return;

  if ("button" in event && event.button !== 0) return;
  if ("isPrimary" in event && event.isPrimary === false) return;

  armCaretLock(input, event);
  queueCaretPlacement(input);
}

export function settleNumericCaretLock(event) {
  const input = getNumericInput(event);
  if (!input || !isActiveCaretLock(input)) return;
  scheduleCaretLockRelease();
  queueCaretPlacement(input);
}

export function enforceNumericCaretLock() {
  const input = activeCaretLock?.input;
  if (!input || document.activeElement !== input) return;

  const end = String(input.value ?? "").length;
  if (input.selectionStart === end && input.selectionEnd === end) return;
  setCaretAtValueEnd(input);
}

export function cancelNumericCaretLock(event) {
  const target = event?.target;
  if (target instanceof HTMLInputElement && activeCaretLock?.input !== target) return;
  clearCaretLock();
}

export function cancelNumericCaretLockOnMove(event) {
  if (!activeCaretLock) return;
  if (
    activeCaretLock.pointerId !== null &&
    Number.isFinite(event?.pointerId) &&
    activeCaretLock.pointerId !== event.pointerId
  ) return;

  const point = getEventPoint(event);
  const startPoint = activeCaretLock.startPoint;
  if (!point || !startPoint) return;

  const movedX = point.clientX - startPoint.clientX;
  const movedY = point.clientY - startPoint.clientY;
  if (Math.hypot(movedX, movedY) > CARET_MOVE_TOLERANCE) clearCaretLock();
}

export function moveNumericCaretToEnd(event) {
  const input = getNumericInput(event);
  if (!input) return;
  queueCaretPlacement(input);
}

export function sanitizeIntegerInput(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function sanitizeDecimalInput(value) {
  const cleaned = String(value ?? "").replace(/[^\d.,]/g, "");
  const separatorIndex = cleaned.search(/[.,]/);
  if (separatorIndex < 0) return cleaned;

  return `${cleaned.slice(0, separatorIndex)}${cleaned[separatorIndex]}${cleaned.slice(separatorIndex + 1).replace(/[.,]/g, "")}`;
}

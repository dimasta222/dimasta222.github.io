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
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(move);
  }
}

// The native mobile tap behavior places the caret where the finger touched.
// Cancel it on the initial press, focus synchronously while the trusted user
// gesture is active, and then place the caret explicitly after the value.
export function focusNumericInputAtEnd(event) {
  const input = getNumericInput(event);
  if (!input) return;

  if ("button" in event && event.button !== 0) return;
  if ("isPrimary" in event && event.isPrimary === false) return;

  if (event.cancelable) event.preventDefault();

  try {
    input.focus({ preventScroll: true });
  } catch {
    input.focus();
  }

  queueCaretPlacement(input);
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

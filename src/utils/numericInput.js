// input[type="number"] does not expose selectionStart/setSelectionRange
// consistently on mobile browsers. Calculator fields use text inputs with a
// numeric keyboard, so the caret can be placed reliably after the value.
function getNumericInput(event) {
  const candidates = [event?.target, event?.currentTarget];
  const input = candidates.find((node) => node instanceof HTMLInputElement);
  if (!input || input.readOnly || input.disabled) return null;
  if (input.type !== "number" && input.inputMode !== "numeric" && input.inputMode !== "decimal") return null;
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

  // The delayed passes run after the browser's native tap/click caret logic
  // and after the mobile keyboard has started opening.
  move();
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      move();
      requestAnimationFrame(move);
    });
  }
  setTimeout(move, 0);
  setTimeout(move, 120);
}

// Used by the delegated pointer/touch listeners in main.jsx. Do not cancel the
// native event: cancelling touchstart/pointerdown can prevent the soft keyboard
// from opening or let the browser restore the tapped caret position afterwards.
export function focusNumericInputAtEnd(event) {
  const input = getNumericInput(event);
  if (!input) return;
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

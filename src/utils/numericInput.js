function getNumericInput(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "number") return null;
  if (input.readOnly || input.disabled) return null;
  return input;
}

function placeCaretAtEnd(input) {
  if (document.activeElement !== input) return;

  try {
    const end = input.value.length;
    input.setSelectionRange(end, end);
  } catch {
    const value = input.value;
    input.value = "";
    input.value = value;
  }
}

function queueCaretPlacement(input) {
  placeCaretAtEnd(input);
  requestAnimationFrame(() => {
    placeCaretAtEnd(input);
    requestAnimationFrame(() => placeCaretAtEnd(input));
  });
  setTimeout(() => placeCaretAtEnd(input), 80);
}

export function focusNumericInputAtEnd(event) {
  const input = getNumericInput(event);
  if (event.type === "touchstart" && "PointerEvent" in window) return;
  if (!input || (event.type === "pointerdown" && event.pointerType === "mouse")) return;

  event.preventDefault();
  input.focus({ preventScroll: true });
  queueCaretPlacement(input);
}

export function moveNumericCaretToEnd(event) {
  const input = getNumericInput(event);
  if (!input) return;

  queueCaretPlacement(input);
}
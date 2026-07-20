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

export function focusNumericInputAtEnd(input) {
  if (!(input instanceof HTMLInputElement) || input.readOnly || input.disabled) return;
  try {
    input.focus({ preventScroll: true });
  } catch {
    input.focus();
  }
  queueCaretPlacement(input);
}

export function moveNumericCaretToEnd(event) {
  const input = event?.currentTarget;
  if (!(input instanceof HTMLInputElement) || input.readOnly || input.disabled) return;
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

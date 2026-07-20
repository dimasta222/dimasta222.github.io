export function moveNumericCaretToEnd(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "number") return;

  requestAnimationFrame(() => {
    if (document.activeElement !== input || input.readOnly || input.disabled) return;
    const value = input.value;
    input.value = "";
    input.value = value;
  });
}
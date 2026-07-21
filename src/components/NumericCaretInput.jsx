import { moveNumericCaretToEnd } from "../utils/numericInput.js";

export default function NumericCaretInput({ disabled = false, onFocus, readOnly = false, ...inputProps }) {
  const handleFocus = (event) => {
    moveNumericCaretToEnd(event);
    onFocus?.(event);
  };

  return (
    <input
      {...inputProps}
      data-caret-end
      disabled={disabled}
      readOnly={readOnly}
      onFocus={handleFocus}
    />
  );
}

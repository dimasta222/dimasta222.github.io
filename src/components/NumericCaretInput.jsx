import { useRef } from "react";
import { focusNumericInputAtEnd, moveNumericCaretToEnd } from "../utils/numericInput.js";

const TAP_MOVE_TOLERANCE = 12;

function findTouch(touchList, identifier) {
  return Array.from(touchList || []).find((touch) => touch.identifier === identifier) || null;
}

export default function NumericCaretInput({ disabled = false, onFocus, readOnly = false, ...inputProps }) {
  const inputRef = useRef(null);
  const touchGestureRef = useRef(null);

  const activateInput = () => {
    focusNumericInputAtEnd(inputRef.current);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length !== 1) {
      touchGestureRef.current = null;
      return;
    }

    const touch = event.touches[0];
    touchGestureRef.current = {
      identifier: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY,
      moved: false,
    };
  };

  const handleTouchMove = (event) => {
    const gesture = touchGestureRef.current;
    if (!gesture || gesture.moved) return;

    const touch = findTouch(event.touches, gesture.identifier);
    if (!touch) return;

    const movedX = touch.clientX - gesture.clientX;
    const movedY = touch.clientY - gesture.clientY;
    if (Math.hypot(movedX, movedY) > TAP_MOVE_TOLERANCE) gesture.moved = true;
  };

  const handleTouchEnd = (event) => {
    const gesture = touchGestureRef.current;
    touchGestureRef.current = null;
    if (!gesture || gesture.moved || !findTouch(event.changedTouches, gesture.identifier)) return;

    if (event.cancelable) event.preventDefault();
    activateInput();
  };

  const handleFocus = (event) => {
    moveNumericCaretToEnd(event);
    onFocus?.(event);
  };

  return (
    <span className="numeric-caret-shell">
      <input
        {...inputProps}
        ref={inputRef}
        data-caret-end
        disabled={disabled}
        readOnly={readOnly}
        onFocus={handleFocus}
      />
      {!disabled && !readOnly && (
        <span
          aria-hidden="true"
          className="numeric-caret-activator"
          onClick={(event) => {
            event.preventDefault();
            activateInput();
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchGestureRef.current = null; }}
        />
      )}
    </span>
  );
}

import { useEffect, useRef } from "react";
import { focusNumericInputAtEnd, moveNumericCaretToEnd } from "../utils/numericInput.js";

const TAP_MOVE_TOLERANCE = 12;

function findTouch(touchList, identifier) {
  return Array.from(touchList || []).find((touch) => touch.identifier === identifier) || null;
}

export default function NumericCaretInput({ disabled = false, onFocus, readOnly = false, ...inputProps }) {
  const inputRef = useRef(null);
  const activatorRef = useRef(null);
  const touchGestureRef = useRef(null);

  const activateInput = () => {
    focusNumericInputAtEnd(inputRef.current);
  };

  useEffect(() => {
    const activator = activatorRef.current;
    if (!activator) return undefined;

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
      if (!gesture || gesture.moved) return;

      const touch = findTouch(event.changedTouches, gesture.identifier);
      if (!touch) return;
      const movedX = touch.clientX - gesture.clientX;
      const movedY = touch.clientY - gesture.clientY;
      if (Math.hypot(movedX, movedY) > TAP_MOVE_TOLERANCE) return;

      // React's delegated touch listener can be passive in Safari. A direct,
      // explicitly non-passive listener reliably cancels WebKit's late tap action.
      if (event.cancelable) event.preventDefault();
      focusNumericInputAtEnd(inputRef.current);
    };

    const handleTouchCancel = () => {
      touchGestureRef.current = null;
    };

    activator.addEventListener("touchstart", handleTouchStart, { passive: true });
    activator.addEventListener("touchmove", handleTouchMove, { passive: true });
    activator.addEventListener("touchend", handleTouchEnd, { passive: false });
    activator.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      activator.removeEventListener("touchstart", handleTouchStart);
      activator.removeEventListener("touchmove", handleTouchMove);
      activator.removeEventListener("touchend", handleTouchEnd);
      activator.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [disabled, readOnly]);

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
          ref={activatorRef}
          aria-hidden="true"
          className="numeric-caret-activator"
          onClick={(event) => {
            event.preventDefault();
            activateInput();
          }}
        />
      )}
    </span>
  );
}

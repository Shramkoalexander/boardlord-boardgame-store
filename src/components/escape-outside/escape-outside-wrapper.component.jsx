import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

function EscapeOutsideWrapper({
  children,
  onEscapeOutside,
  isNodeToEscapeVisible = true,
  nodesToIgnore = [],
  ...otherProps
}) {
  const nodeToEscape = useRef();

  const handleClick = useCallback(
    (e) => {
      if (
        nodeToEscape.current &&
        !nodeToEscape.current.contains(e.target) &&
        (nodesToIgnore.length > 0
          ? !nodesToIgnore.some((node) =>
              node ? node.contains(e.target) : false
            )
          : true)
      ) {
        isNodeToEscapeVisible && onEscapeOutside();
      }
    },
    [nodesToIgnore, isNodeToEscapeVisible, onEscapeOutside]
  );

  const handlePressEscape = useCallback(
    (e) => {
      if (e.keyCode === 27) onEscapeOutside();
    },
    [onEscapeOutside]
  );
  useEffect(() => {
    window.addEventListener("click", handleClick, true);
    window.addEventListener("touchend", handleClick, true);
    window.addEventListener("keydown", handlePressEscape, true);

    return () => {
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("touchend", handleClick, true);
      window.removeEventListener("keydown", handlePressEscape, true);
    };
  }, [handleClick, handlePressEscape]);
  return (
    <span
      ref={(node) => {
        nodeToEscape.current = node;
      }}
      {...otherProps}
    >
      {children}
    </span>
  );
}

export default EscapeOutsideWrapper;

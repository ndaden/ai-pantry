import React from "react";

type useLongPressProps = {
  duration: number;
  element?: HTMLElement | Document;
};

export const useLongPress = ({
  duration = 500,
  element,
}: useLongPressProps) => {
  const [hasPressed, setHasPressed] = React.useState(false);

  React.useLayoutEffect(() => {
    let to: NodeJS.Timeout;
    const onMouseDown: EventListenerOrEventListenerObject = (e) => {
      // e.stopPropagation();
      to = setTimeout(() => {
        setHasPressed(true);
      }, duration);
    };
    const onMouseUp: EventListenerOrEventListenerObject = (e) => {
      e.stopPropagation();
      clearTimeout(to);
      setHasPressed(false);
    };
    if (element) {
      element.addEventListener("mousedown", onMouseDown);
      element.addEventListener("mouseup", onMouseUp);

      element.addEventListener("touchstart", onMouseDown);
      element.addEventListener("touchend", onMouseUp);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousedown", onMouseDown);
        element.removeEventListener("mouseup", onMouseUp);

        element.removeEventListener("touchstart", onMouseDown);
        element.removeEventListener("touchend", onMouseUp);
      }
      clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  return { hasPressed, setHasPressed };
};

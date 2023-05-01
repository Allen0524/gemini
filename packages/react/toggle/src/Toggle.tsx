import * as React from 'react';

interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>((props, forwardedRef) => {
  const { pressed, defaultPressed = false } = props;
  return (
    <button type="button" ref={forwardedRef}>
      Toggle
    </button>
  );
});

export { Toggle };

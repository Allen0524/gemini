import * as React from 'react';
import { useControllableState } from '@allen0318563/react-use-controllable-state';

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  children?: React.ReactNode;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>((props, forwardedRef) => {
  const { pressed: pressedProp, defaultPressed = false, onPressedChange, ...buttonProps } = props;

  const [pressed = false, setPressed] = useControllableState({
    prop: pressedProp,
    defaultProps: defaultPressed,
    onChange: onPressedChange,
  });

  return (
    <button
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      data-disabled={props.disabled ? '' : undefined}
      ref={forwardedRef}
      {...buttonProps}
      onClick={() => {
        setPressed(!pressed);
      }}
    />
  );
});

export { Toggle };

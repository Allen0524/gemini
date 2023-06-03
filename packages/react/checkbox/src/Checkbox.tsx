import * as React from 'react';
// import { useControllableState } from '@allen0318563/react-use-controllable-state';
import { useControllableState } from '../../useControllableState/src';
// import {} from '@allen0318563/react-context';
import { createAppContext } from '../../context/src';

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  defaultchecked?: boolean;
  required?: boolean;
  children?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  //   name,
  //   value
}

interface IndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const [CheckboxProvider, useCheckboxContext] = createAppContext<{
  checked: boolean;
}>();

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((props, forwardedRef) => {
  const {
    checked: checkedProp,
    defaultChecked,
    required,
    onCheckedChange,
    ...checkboxProps
  } = props;

  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProps: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <CheckboxProvider checked={checked}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        data-disabled={props.disabled ? '' : undefined}
        data-state={getCheckState(checked)}
        ref={forwardedRef}
        onClick={() => {
          setChecked(!checked);
        }}
        {...checkboxProps}
      />
    </CheckboxProvider>
  );
});

function Indicator({ children, ...indicatorProps }: IndicatorProps) {
  const { checked } = useCheckboxContext();

  return (
    <span data-state={getCheckState(checked)} {...indicatorProps}>
      {children}
    </span>
  );
}

function getCheckState(checked: boolean) {
  return checked ? 'checked' : 'unChecked';
}

const Root = Checkbox;

export { Root, Indicator };

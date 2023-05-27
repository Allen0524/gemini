import * as React from 'react';

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProps?: T | undefined;
  onChange?: (state: T) => void;
};

function useControllableState<T>({
  prop,
  defaultProps,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [unControlledProp, setUnControlledProp] = React.useState<T>();
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : unControlledProp;

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = (nextValue) => {
    if (isControlled) {
      onChange(nextValue as T);
    } else {
      setUnControlledProp(nextValue);
    }
  };

  return [value, setValue] as const;
}

export { useControllableState };

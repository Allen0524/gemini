import * as React from 'react';

function useCallbackRef<T>(callback: T) {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  return React.useCallback((...args) => {
    callbackRef.current(...args);
  }, []);
}

export { useCallbackRef };

import * as React from 'react';

type refType<T> = React.Ref<T> | undefined;

function composeRefs<T>(...refs: refType<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    }
  };
}

export { composeRefs };

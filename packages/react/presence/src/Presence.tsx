import * as React from 'react';
import ReactDOM from 'react-dom';

interface PresenceProps {
  children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
  present: boolean;
}

function Presence({ present, children }: PresenceProps) {
  const { presence, callbackRef } = usePresence(present);

  const child = (
    typeof children === 'function' ? children({ present }) : React.Children.only(children)
  ) as React.ReactElement;

  return presence
    ? ReactDOM.createPortal(React.cloneElement(child, { ref: callbackRef }), document.body)
    : null;
}

function usePresence(present: boolean) {
  const [presence, setPresence] = React.useState(present);
  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  const stylesRef = React.useRef<CSSStyleDeclaration>();

  React.useEffect(() => {
    let hasAnimation = stylesRef.current?.animationName !== 'none';

    if (present) {
      setPresence(present);
    }

    if (hasAnimation) {
      if (node) {
        function handleAnimationEnd() {
          // if (!present) setPresence(present);
          if (!present) ReactDOM.flushSync(() => setPresence(present));
        }

        node.addEventListener('animationend', handleAnimationEnd);

        return () => {
          node.removeEventListener('animationend', handleAnimationEnd);
        };
      }
    } else {
      if (!present) ReactDOM.flushSync(() => setPresence(present));
    }
  }, [node, present]);

  const callbackRef = React.useCallback((node: HTMLDivElement) => {
    if (node) stylesRef.current = getComputedStyle(node);
    setNode(node);

    console.log(stylesRef.current?.animationName === 'none');
  }, []);

  return {
    presence,
    callbackRef,
  };
}

export { Presence };

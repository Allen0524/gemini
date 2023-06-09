import * as React from 'react';
import { Presence } from '@allen0318563/react-presence';
import { createAppContext } from '@allen0318563/react-context';
import { composeRefs } from '@allen0318563/react-compose-refs';
import { useCallbackRef } from '@allen0318563/react-use-callback-ref';

type AnchorInfo = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const [DropdownMenuProvider, useDropdownMenuContext] = createAppContext<{
  present: boolean;
  setPresent: React.Dispatch<React.SetStateAction<boolean>>;
  anchorNode: React.MutableRefObject<HTMLDivElement | null>;
  value: string;
  onValueChange: (id: string) => void;
}>();

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DropdownMenu({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (id: string) => void;
  children: React.ReactNode;
}) {
  const [present, setPresent] = React.useState(false);
  const anchorNode = React.useRef<HTMLDivElement | null>(null);

  return (
    <DropdownMenuProvider
      present={present}
      setPresent={setPresent}
      anchorNode={anchorNode}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </DropdownMenuProvider>
  );
}

function Trigger(props: TriggerProps) {
  const { children, ...triggerProps } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  const { present, setPresent, anchorNode } = useDropdownMenuContext();
  const callbackRef = useCallbackRef((node) => {
    if (node) {
      anchorNode.current = node;
    }
  });
  const refs = composeRefs(ref, callbackRef);

  React.useEffect(() => {
    if (present) {
      function clickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPresent(false);
        }
      }

      window.addEventListener('click', clickOutside);

      return () => {
        window.removeEventListener('click', clickOutside);
      };
    }
  }, [present]);

  React.useEffect(() => {
    function handleOnResize() {
      if (present) {
        setPresent(!present);
      }
    }

    window.addEventListener('resize', handleOnResize);

    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, [present]);

  return (
    <button
      {...triggerProps}
      ref={refs}
      onClick={(event) => {
        setPresent(!present);
      }}
      data-state={present ? 'open' : 'closed'}
      style={{
        ...triggerProps.style,
        ...{
          '--anchor-width': 300,
        },
      }}
    >
      {children}
    </button>
  );
}

function Portal({ children }: { children: React.ReactElement }) {
  const { present } = useDropdownMenuContext();

  return <Presence present={present}>{children}</Presence>;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, ...contentProps }, forwardedRef) => {
    const { present, anchorNode } = useDropdownMenuContext();
    const ref = React.useRef<HTMLDivElement>(null);
    const refs = composeRefs(forwardedRef, ref);
    const state = present ? 'open' : 'closed';
    const anchorInfo = anchorNode.current?.getBoundingClientRect();

    const translateX = anchorInfo && ref.current ? anchorInfo.left : 0;

    const translateY = anchorInfo ? anchorInfo?.top + anchorInfo?.height : 0;

    return (
      <div
        ref={refs}
        data-state={state}
        {...contentProps}
        style={{
          ...contentProps.style,
          position: 'fixed',
          top: '0',
          left: '0',
          transform: `translate(${translateX}px, ${translateY}px)`,
          ...{
            '--gemini-dropdown-menu-anchor-left': `${anchorInfo?.left}px`,
            '--gemini-dropdown-menu-anchor-top': `${anchorInfo?.top}px`,
            '--gemini-dropdown-menu-anchor-height': `${anchorInfo?.height}px`,
            '--gemini-dropdown-menu-anchor-width': `${anchorInfo?.width}px`,
          },
        }}
      >
        {children}
      </div>
    );
  }
);

interface ItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  id: string;
  children: React.ReactNode;
}

function Item(props: ItemProps) {
  const { children, ...itemProps } = props;
  const { onValueChange } = useDropdownMenuContext();

  function handleOnClick() {
    onValueChange(itemProps.id);
  }

  return (
    <div role="button" tabIndex={0} {...itemProps} onClick={handleOnClick}>
      {children}
    </div>
  );
}

const Root = DropdownMenu;

export { Root, Trigger, Portal, Content, Item };

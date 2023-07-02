import * as React from 'react';
import { Presence } from '../../presence/src';
import { createAppContext } from '../../context/src';
import { composeRefs } from '../../compose-refs/src';

const [DropdownMenuProvider, useDropdownMenuContext] = createAppContext<{
  present: boolean;
  setPresent: React.Dispatch<React.SetStateAction<boolean>>;
  anchorInfo: {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  };
  value: string;
  onValueChange: (id: string) => void;
  setAnchorInfo: React.Dispatch<React.SetStateAction<{}>>;
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
  const [anchorInfo, setAnchorInfo] = React.useState({});

  return (
    <DropdownMenuProvider
      present={present}
      setPresent={setPresent}
      anchorInfo={anchorInfo}
      setAnchorInfo={setAnchorInfo}
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
  const { present, setPresent, setAnchorInfo } = useDropdownMenuContext();

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

  return (
    <button
      {...triggerProps}
      ref={ref}
      onClick={(event) => {
        setPresent(!present);
        setAnchorInfo(event.currentTarget.getBoundingClientRect());
      }}
      data-state={present ? 'open' : 'closed'}
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
    const { present, setPresent, anchorInfo, onValueChange } = useDropdownMenuContext();
    const ref = React.useRef<HTMLDivElement>(null);
    const refs = composeRefs(forwardedRef, ref);
    const state = present ? 'open' : 'closed';

    function handleOnClick(event) {
      const { id } = event.target;

      if (id) {
        onValueChange(id);
      }
      // setPresent(!present);
    }

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
          transform: `translate(${
            anchorInfo.left -
            (ref.current?.getBoundingClientRect()?.width / 2 - anchorInfo?.width / 2)
          }px, ${anchorInfo?.top + anchorInfo?.height}px)`,
          ...{
            '--gemini-dropdown-menu-content-anchor-left': anchorInfo?.left || undefined,
            '--gemini-dropdown-menu-content-anchor-top': anchorInfo?.top || undefined,
            '--gemini-dropdown-menu-content-anchor-height': anchorInfo?.height || undefined,
            '--gemini-dropdown-menu-content-anchor-width': anchorInfo?.width || undefined,
          },
        }}
        onClick={handleOnClick}
      >
        {children}
      </div>
    );
  }
);

interface ItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  id: string;
  value: React.ReactNode;
}

function Item(props: ItemProps) {
  const { value, ...itemProps } = props;

  return (
    <div role="button" {...itemProps}>
      {value}
    </div>
  );
}

const Root = DropdownMenu;

export { Root, Trigger, Portal, Content, Item };

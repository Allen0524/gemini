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
  setAnchorInfo: React.Dispatch<React.SetStateAction<{}>>;
}>();

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [present, setPresent] = React.useState(false);
  const [anchorInfo, setAnchorInfo] = React.useState({});

  return (
    <DropdownMenuProvider
      present={present}
      setPresent={setPresent}
      anchorInfo={anchorInfo}
      setAnchorInfo={setAnchorInfo}
    >
      {children}
    </DropdownMenuProvider>
  );
}

function Trigger(props: TriggerProps) {
  const { children, ...triggerProps } = props;
  const { present, setPresent, setAnchorInfo } = useDropdownMenuContext();

  return (
    <button
      {...triggerProps}
      onClick={(event) => {
        setPresent(!present);
        console.log(event.currentTarget.getBoundingClientRect());
        setAnchorInfo(event.currentTarget.getBoundingClientRect());
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
    const { present, anchorInfo } = useDropdownMenuContext();
    const ref = React.useRef<HTMLDivElement>(null);
    const refs = composeRefs(forwardedRef, ref);
    const state = present ? 'open' : 'closed';

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
      >
        {children}
      </div>
    );
  }
);

function Item() {}

const Root = DropdownMenu;

export { Root, Trigger, Portal, Content, Item };

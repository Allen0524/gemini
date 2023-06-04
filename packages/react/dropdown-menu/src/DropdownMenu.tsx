import * as React from 'react';
import { Presence } from '../../presence/src';
import { createAppContext } from '../../context/src';

const [DropdownMenuProvider, useDropdownMenuContext] = createAppContext<{
  present: boolean;
  setPresent: React.Dispatch<React.SetStateAction<boolean>>;
}>();

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [present, setPresent] = React.useState(false);

  return (
    <DropdownMenuProvider present={present} setPresent={setPresent}>
      {children}
    </DropdownMenuProvider>
  );
}

function Trigger(props: TriggerProps) {
  const { children, ...triggerProps } = props;
  const { present, setPresent } = useDropdownMenuContext();

  return (
    <button {...triggerProps} onClick={() => setPresent(!present)}>
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
    const { present } = useDropdownMenuContext();
    const state = present ? 'open' : 'closed';

    return (
      <div ref={forwardedRef} data-state={state} {...contentProps}>
        {children}
      </div>
    );
  }
);

function Item() {}

const Root = DropdownMenu;

export { Root, Trigger, Portal, Content, Item };

import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

function Button(props: ButtonProps) {
  const { children, ...buttonProps } = props;
  return <button {...buttonProps}>{children}</button>;
}

const Root = Button;

export { Root };

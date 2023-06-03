import * as React from 'react';

function createAppContext<T extends object | null>(defaultValue?: T) {
  const Context = React.createContext<T | undefined>(defaultValue);

  function Provider(props: T & { children: React.ReactNode }) {
    const { children, ...contextProps } = props;
    const value = contextProps as T;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);

    if (!context) throw new Error('no context value');

    return context;
  }

  return [Provider, useContext] as const;
}

export { createAppContext };

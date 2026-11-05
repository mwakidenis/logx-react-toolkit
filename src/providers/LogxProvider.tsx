import { createContext, useContext, ReactNode } from "react";
import * as logx from "../internal/logx";

export interface LogxContextValue {
  logx: typeof logx;
}

const LogxContext = createContext<LogxContextValue | null>(null);

/**
 * Provider that exposes the LOGX integration layer via React context.
 *
 * Wrap your application (or a subtree) so components and hooks can access
 * LOGX utilities through context instead of importing @mwakidenis/logx
 * directly. This is optional; all hooks and components work standalone.
 *
 * @param props - Component props
 */
export function LogxProvider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <LogxContext.Provider value={{ logx }}>
      {children}
    </LogxContext.Provider>
  );
}

/**
 * Consume the LOGX integration layer from context.
 * Returns null when used outside a LogxProvider.
 */
export function useLogx(): LogxContextValue | null {
  return useContext(LogxContext);
}

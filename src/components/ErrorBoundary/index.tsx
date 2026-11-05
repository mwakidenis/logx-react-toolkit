import { Component, ReactNode } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "../../types";

/**
 * React error boundary.
 *
 * Captures descendant rendering errors, supports a fallback UI (element or
 * render function receiving the error and React error info), an optional
 * onError callback, and optional reset via `resetKeys` changes.
 *
 * Limitations: does not catch errors in event handlers, asynchronous code
 * (setTimeout, promises), or server-side rendering. Those must be handled
 * separately (try/catch, error-first callbacks, etc.).
 *
 * @param props - Component props
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, info: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ info });
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.props.resetKeys !== prevProps.resetKeys) {
      const prev = JSON.stringify(prevProps.resetKeys);
      const next = JSON.stringify(this.props.resetKeys);
      if (prev !== next) {
        this.setState({ hasError: false, error: null, info: null });
      }
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback === undefined) return null;
      if (typeof fallback === "function") {
        return (fallback as (error: Error, info: React.ErrorInfo) => ReactNode)(
          this.state.error!,
          this.state.info!,
        );
      }
      return fallback;
    }
    return this.props.children;
  }
}

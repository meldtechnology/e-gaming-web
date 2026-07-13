import React, { type ErrorInfo, type ReactNode } from "react";

type RuntimeErrorEvent = {
  message: string;
  componentStack?: string;
};

type RuntimeErrorSink = (event: RuntimeErrorEvent) => void;

declare global {
  interface Window {
    __ESGC_RUNTIME_ERROR__?: RuntimeErrorSink;
  }
}

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const event = {
      message: error.message,
      componentStack: errorInfo.componentStack ?? undefined,
    };

    if (import.meta.env.DEV) {
      console.error("[runtime-error]", event);
    }

    window.__ESGC_RUNTIME_ERROR__?.(event);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-surface p-8 text-text-primary" role="alert">
          <h1 className="font-helvetica text-[24px] font-bold">Something went wrong</h1>
          <p className="mt-2 text-[16px] text-text-secondary">
            Please refresh the page or try again later.
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}

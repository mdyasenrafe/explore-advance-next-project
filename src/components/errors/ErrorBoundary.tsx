"use client";

import { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type TProps = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, TProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

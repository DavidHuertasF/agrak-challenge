import React from "react";

import "./ErrorBoundary.css";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize state with no errors
    this.state = { hasError: false, error: null, info: null };
  }

  // Catch errors thrown by child components
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to display fallback UI
    return { hasError: true, error, info: null };
  }

  // Log errors to an error reporting service
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
    // Update state to display fallback UI
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI for errors
      return (
        <div className="error-boundary">
          <h1 className="error-boundary-heading">Oops! Something went wrong.</h1>
          <p className="error-boundary-text">Please try again later.</p>
          {this.state.error && <p className="error-boundary-text">{this.state.error.message}</p>}
        </div>
      );
    }

    // Render children normally if no errors occurred
    return this.props.children;
  }
}

export default ErrorBoundary;

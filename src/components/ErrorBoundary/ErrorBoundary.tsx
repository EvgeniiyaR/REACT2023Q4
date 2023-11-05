import { Component, ErrorInfo, ReactNode } from 'react';
import Modal from '../Modal/Modal';

interface IErrorBoundaryProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  componentDidUpdate(
    prevProps: IErrorBoundaryProps,
    prevState: IErrorBoundaryState
  ) {
    if (this.state.hasError && !prevState.hasError) {
      this.forceUpdate();
    }
  }

  closeErrorModal = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal
          message={
            this.state.error ? this.state.error.message : 'Unknown error'
          }
          onClose={this.closeErrorModal}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

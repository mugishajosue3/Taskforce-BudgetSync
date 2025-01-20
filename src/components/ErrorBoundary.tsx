import React from 'react';
import { Card, Text, Button } from '@mantine/core';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card shadow="sm" p="lg" style={{ maxWidth: 500, margin: '2rem auto' }}>
          <Text size="xl" weight={500} mb="md">Something went wrong</Text>
          <Text mb="xl">We apologize for the inconvenience. Please try refreshing the page.</Text>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import {
  ErrorFallbackProps,
  ErrorComponent,
  ErrorBoundary,
  AppProps,
} from '@blitzjs/next';
import { CssBaseline } from '@mui/material';
import { AuthenticationError, AuthorizationError } from 'blitz';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { withBlitz } from 'src/blitz-client';

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SnackbarProvider>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </SnackbarProvider>
  );
}

export default withBlitz(MyApp);

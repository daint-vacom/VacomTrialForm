import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';
import { SignUpPage } from './pages/sign-up';
import { QueryProvider } from './providers/query-provider';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryProvider>
        <Toaster />
        <SignUpPage />
      </QueryProvider>
    </QueryClientProvider>
  );
}

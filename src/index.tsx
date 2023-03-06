import {createRoot} from 'react-dom/client';
import App from './App'
import {QueryClient, QueryClientProvider} from "react-query";
import {UserContextProvider} from './main/context/UserContext';

export const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
} );

const app = (
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </QueryClientProvider>
)

const container = document.getElementById( 'root' );
const root = createRoot( container! );
root.render( app );

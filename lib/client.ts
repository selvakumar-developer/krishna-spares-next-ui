
import { getCookie } from "@/app/actions/cookie-action";
import { from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { API_BASE_URL } from "./constant";


export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const ACCESS_TOKEN = await getCookie('accessToken');


  // Create an HTTP link with the authorization header
  const httpLink = new HttpLink({
    uri: API_BASE_URL,
    credentials: 'include',
    headers: {
      authorization: `Bearer ${ACCESS_TOKEN}`
    },

  });

  // Error handling link to catch auth errors
  const errorLink = onError(({ graphQLErrors }) => {

    if (graphQLErrors) {

      graphQLErrors.forEach(async (error) => {
        const extensions = error.extensions || {};

        const originalError = extensions.originalError as any;

        // Check for authentication errors
        if (
          extensions?.code === 'UNAUTHENTICATED' ||
          originalError?.statusCode === 401
        ) {
          // Handle client-side redirection
          if (typeof window !== 'undefined') {
            // Clear auth token if needed
            // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Redirect to login page
            // window.location.href = '/login';
          } else {

          }
        }
      });
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
});

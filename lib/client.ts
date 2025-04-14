import { getCookie } from "@/app/actions/cookie-action";
import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { API_BASE_URL } from "./constant";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const ACCESS_TOKEN = await getCookie('accessToken');
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: API_BASE_URL,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: {
        //  cache: "no-store",
        credentials: 'include', // This ensures cookies are sent with requests
      },
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      }
    }),
  });
});

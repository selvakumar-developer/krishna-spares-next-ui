"use client";

import { getCookie } from "@/app/actions/cookie-action";
import { from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { API_BASE_URL } from "./constant";

// have a function to create a client for you
export function makeClient() {
  // const httpLink = new HttpLink({
  //   // this needs to be an absolute url, as relative urls cannot be used in SSR
  //   uri: API_BASE_URL,
  //   // you can disable result caching here if you want to
  //   // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  //   fetchOptions: { cache: "no-store" },
  //   // you can override the default `fetchOptions` on a per query basis
  //   // via the `context` property on the options passed as a second argument
  //   // to an Apollo Client data fetching hook, e.g.:
  //   // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  // });

  const uploadLink = createUploadLink({
    uri: API_BASE_URL,
    fetchOptions: { cache: "no-store" },
    headers: {
      authorization: `Bearer`,
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    // Only access localStorage on the client side
    const token = await getCookie("accessToken");

    return {
      headers: {
        ...headers,
        ...(token && { authorization: `Bearer ${token}` }),
      },
    };
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: from([authLink, uploadLink]),
  });
}

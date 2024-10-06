"use client";

import { makeClient } from "@/lib/apollo-provider";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

export default ApolloWrapper;

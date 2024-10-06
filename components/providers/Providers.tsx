import React from "react";
import ApolloWrapper from "./ApolloProvider";

function Providers({ children }: React.PropsWithChildren) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}

export default Providers;

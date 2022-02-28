import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import NavBar from "../components/NavBar";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
   return (
      <QueryClientProvider client={queryClient}>
         <ChakraProvider>
            <NavBar />
            <Component {...pageProps} />
         </ChakraProvider>
      </QueryClientProvider>
   );
}

export default MyApp;

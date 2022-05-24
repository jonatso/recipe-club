import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import NavBar from "../components/NavBar";
import Head from "next/head";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: false,
      },
   },
});

function MyApp({ Component, pageProps }) {
   return (
      <QueryClientProvider client={queryClient}>
         <ChakraProvider>
            <Head>
               <title>RecipeClub</title>
               <meta property="RecipeClub" content="RecipeClub" key="title"></meta>
            </Head>
            <NavBar />
            <Component {...pageProps} />
         </ChakraProvider>
      </QueryClientProvider>
   );
}

export default MyApp;

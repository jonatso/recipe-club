import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Logo() {
   return (
      <Box>
         <NextLink href={"/"}>
            <Link
               _hover={{
                  textDecoration: "none",
               }}
            >
               <Text p={2} fontWeight="bold" fontSize="lg">
                  RecipeClub
               </Text>
            </Link>
         </NextLink>
      </Box>
   );
}

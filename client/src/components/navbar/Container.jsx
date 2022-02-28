import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function Container({ children }) {
   return (
      <Flex
         as="nav"
         align="center"
         justify="space-between"
         wrap="wrap"
         w="100%"
         mb={8}
         p={2}
         bg={useColorModeValue("gray.100", "gray.900")}
      >
         {children}
      </Flex>
   );
}

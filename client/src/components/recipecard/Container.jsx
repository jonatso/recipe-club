import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Container({ children, id, isHoveredOver, setHover }) {
   return (
      <NextLink href={`/recipes/${id}`}>
         <Box
            cursor={"pointer"}
            bg={isHoveredOver ? useColorModeValue("gray.50", "whiteAlpha.50") : useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            transform={isHoveredOver ? "translateY(-2px)" : "translateY(0px)"}
         >
            {children}
         </Box>
      </NextLink>
   );
}

import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";

export default function AddIngredient() {
   return (
      <Button
         rounded={"none"}
         w={"full"}
         mt={8}
         size={"lg"}
         py={"7"}
         bg={useColorModeValue("gray.900", "gray.50")}
         color={useColorModeValue("white", "gray.900")}
         textTransform={"uppercase"}
         _hover={{
            boxShadow: "lg",
         }}
      >
         Add ingredients to shopping list
      </Button>
   );
}

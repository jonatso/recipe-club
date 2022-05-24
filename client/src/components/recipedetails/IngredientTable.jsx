import React, { useState } from "react";
import { Box, Text, Thead, Tr, Th, Td, Tbody, Table, useColorModeValue, HStack, IconButton } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function IngredientTable({ ingredients }) {
   const [numPortions, setNumPortions] = useState(4);
   
   return (
      <Box>
         <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={useColorModeValue("yellow.500", "yellow.300")}
            fontWeight={"500"}
            textTransform={"uppercase"}
            mb={"4"}
         >
            Ingredients
         </Text>
         <HStack 
                  bg={useColorModeValue('gray.200', 'gray.600')}
                  width='fit-content'
                  padding='1'
                  borderRadius='md'
                >
                  <IconButton 
                    colorScheme='teal' 
                    icon={<FaMinus />} 
                    onClick={() => setNumPortions(numPortions - 1)}
                    isRound
                  />
                  <Text 
                    fontSize={'lg'} 
                    bg={useColorModeValue('white', 'gray.800')} 
                    pl='6' 
                    pr='6'
                    pt='2'
                    pb='2'
                    borderRadius='md'
                    color={useColorModeValue('gray.800', 'white')}
                  >
                    {numPortions}
                  </Text>
                  <IconButton 
                    colorScheme='teal' 
                    icon={<FaPlus />} 
                    onClick={() => setNumPortions(numPortions + 1)}
                    isRound
                  />
                </HStack>

         <Table variant="simple">
            <Thead>
               <Tr>
                  <Th>Ingredient</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th>Unit</Th>
               </Tr>
            </Thead>
            <Tbody>
               {ingredients.map((ingredient) => (
                  <Tr key={ingredient.name}>
                     <Td>{ingredient.name}</Td>
                     <Td isNumeric>{ingredient.quantity * numPortions}</Td>
                     <Td>{ingredient.unit}</Td>
                  </Tr>
               ))}
            </Tbody>
         </Table>
      </Box>
   );
}

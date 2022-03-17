import React from "react";
import { Stack, Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function TitleDesc({ name, difficulty, description, username, time }) {
   return (
      <Stack spacing={2}>
         <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               {name}
            </Heading>
            <Text fontSize={"md"} pt={3} pb={3}>
               Created by: {username}
            </Text>
            <Text color={difficulty == 1 ? "green.500" : difficulty == 2 ? "yellow.500" : "red.500"} textTransform={"uppercase"} fontWeight={800} fontSize={"xl"} letterSpacing={1.1}>
               {difficulty == 1 ? "Easy" : difficulty == 2 ? "Medium" : "Hard"} ({time} min)
            </Text>
         </Box>
         <Box>
            <Text

               fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"}
            >
               Description:
            </Text>
            <Text>{description}</Text>
         </Box>
      </Stack>
   );
}

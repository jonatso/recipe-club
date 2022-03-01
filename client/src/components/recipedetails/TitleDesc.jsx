import React from "react";
import { Stack, Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function TitleDesc({ name, difficulty, description, username }) {
   return (
      <Stack spacing={2}>
         <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               {name}
            </Heading>
            <Text fontSize={"md"} pt={3} pb={3}>
               Created by: {username}
            </Text>
            <Text color={"green.500"} textTransform={"uppercase"} fontWeight={800} fontSize={"xl"} letterSpacing={1.1}>
               Difficulty: {difficulty}
            </Text>
         </Box>
         <Box>
            <Text
               color={useColorModeValue("yellow.500", "yellow.300")}
               textTransform={"uppercase"}
               fontWeight={800}
               fontSize={"l"}
               letterSpacing={1.1}
            >
               Description:
            </Text>
            <Text>{description}</Text>
         </Box>
      </Stack>
   );
}

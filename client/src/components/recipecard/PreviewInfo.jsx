import React from "react";
import { Box, Heading, Text, Stack, useColorModeValue } from "@chakra-ui/react";

export default function PreviewInfo({ name, description, isHoveredOver, difficulty, time }) {
   return (
      <Stack>
         <Text
            color={difficulty == 1 ? "green.500" : difficulty == 2 ? "yellow.500" : "red.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
         >
            {difficulty == 1 ? "Easy" : difficulty == 2 ? "Medium" : "Hard"} ({time} min)
         </Text>
         <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
            textDecoration={isHoveredOver ? "underline" : "none"}
         >
            {name}
         </Heading>
         <Box minHeight={"3em"}>
            <Text color={"gray.500"}>
               {description.slice(0, 50)}
               {description[51] ? "..." : null}
            </Text>
         </Box>
      </Stack>
   );
}

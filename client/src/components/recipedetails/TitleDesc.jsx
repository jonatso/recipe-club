import React from "react";
import { Stack, Box, Heading, Text, useColorModeValue, HStack, Avatar } from "@chakra-ui/react";
import NextLink from 'next/link'


export default function TitleDesc({ name, difficulty, description, username, time, userId, picture }) {
   return (
      <Stack spacing={2}>
         <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               {name}
            </Heading>
            
            
            <Text color={difficulty == 1 ? "green.500" : difficulty == 2 ? "yellow.500" : "red.500"} textTransform={"uppercase"} fontWeight={800} fontSize={"xl"} letterSpacing={1.1}>
               {difficulty == 1 ? "Easy" : difficulty == 2 ? "Medium" : "Hard"} ({time} min)
            </Text>
            <NextLink href={`http://localhost:3000/profile/${userId}`}>
            <HStack pt={5} pb={5} >
               <Avatar 
                    size={"sm"}
                    src={picture || 'https://bit.ly/broken-link'} />
               <Text>{username}</Text>
            </HStack>
            </NextLink>
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

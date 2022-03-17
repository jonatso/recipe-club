import React from "react";
import { Stack, Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function UserInfo({name, email, bio }) {
   return (
    <Stack spacing={2}>
       <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               Name here {name}
            </Heading>
            <Text fontSize={"md"} pt={3} pb={3}>
               Email here {email}
            </Text>

        </Box>
         <Box>
            <Text
               fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"}>
               Bio
            </Text>
            <Text>{bio}</Text>
         </Box>
    </Stack>
    
   );
}

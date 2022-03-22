import React from "react";
import { Stack, Box, Heading, Text, useColorModeValue, Button } from "@chakra-ui/react";
import {FaFacebook } from "react-icons/fa";


export default function UserInfo({profile}) {
   return (
    <Stack spacing={2}>
       <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               {profile.username}
            </Heading>
            <Text fontSize={"md"} pt={3} pb={3}>
               {profile.email}
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
            <Text>{profile.bio || "no bio..."}</Text>
         </Box>
         {profile.facebook_username && <Button colorScheme='facebook' leftIcon={<FaFacebook />}>
            Contact {profile.username}
         </Button>}
    </Stack>
    
   );
}

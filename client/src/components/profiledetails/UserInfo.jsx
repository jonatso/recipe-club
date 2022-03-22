import React from "react";
import { Stack, Box, Heading, Text, useColorModeValue, Button, HStack } from "@chakra-ui/react";
import {FaEnvelope, FaFacebook, FaMailBulk, FaMailchimp } from "react-icons/fa";
import { Link } from '@chakra-ui/react'
export default function UserInfo({profile}) {
   return (
    <Stack spacing={2}>
       <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               {profile.username}
            </Heading>
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
            <Text>{profile.biography || "no bio..."}</Text>
         </Box>
         

         <HStack width='fit-content'>
            <Link href={"mailto:" + profile.email}>
               <Button colorScheme='twitter' leftIcon={<FaEnvelope />}>
                  Send {profile.username} an e-mail
               </Button>
            </Link>
            {profile.facebook_username && <Link href={"https://www.facebook.com/" + profile.facebook_username}><Button colorScheme='facebook' leftIcon={<FaFacebook />}>
            {profile.username} on Facebook</Button></Link>}
            
         </HStack>
    </Stack>
    
   );
}

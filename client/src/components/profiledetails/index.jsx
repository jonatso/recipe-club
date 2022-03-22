import React from "react";
import PageContainer from "../../core_ui/PageContainer";
import ProfilePicture from "./ProfilePicture";
import UserInfo from "./UserInfo";
import Recipes from "./Recipes";
import { HStack, Center, Text, useColorModeValue } from "@chakra-ui/react";
//import { Box } from '@chakra-ui/react'

export default function ProfileDetails({ profile }) {
   return (

      <PageContainer>
      <Center>
      <HStack spacing='100px'>
         <ProfilePicture picture={profile.picture} />
         <UserInfo profile={profile} />
      </HStack>
      </Center>
      <Center><Text fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"} pt={10}>{profile.username}'s recipes:</Text>
      </Center>
         

      <Recipes id={profile.id}/>
   </PageContainer>
   );
}
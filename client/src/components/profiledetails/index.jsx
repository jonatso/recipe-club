import React from "react";
import PageContainer from "../../core_ui/PageContainer";
import ProfilePicture from "./ProfilePicture";
import UserInfo from "./UserInfo";
import Recipes from "./Recipes";
import { Stack, HStack, Center, Text, useColorModeValue, Tabs, TabPanel, TabPanels, TabList, Tab } from "@chakra-ui/react";
//import { Box } from '@chakra-ui/react'

export default function ProfileDetails({ profile }) {
   const [tabIndex, setTabIndex] = React.useState(0);
   return (

      <PageContainer>
      <Stack spacing='50px'>
         <Center>
      <HStack spacing='100px'>
         <ProfilePicture picture={profile.picture} />
         <UserInfo profile={profile} />
      </HStack>
      </Center>   
      {/* <Center><Text fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"} pt={10}>{profile.username}'s recipes:</Text>
      </Center> */}
         
      <Tabs spacing='100px' isFitted variant='enclosed' onChange={(index) => setTabIndex(index)}>
         <TabList>
            <Tab fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"} pt={5}>{profile.username}'s recipes</Tab>
            <Tab fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"} pt={5}>{profile.username}'s saved recipes</Tab>
         </TabList>
         </Tabs>
         <Recipes id={profile.id} getSaved={tabIndex!==0}/>

       </Stack>
   </PageContainer>
   );
}
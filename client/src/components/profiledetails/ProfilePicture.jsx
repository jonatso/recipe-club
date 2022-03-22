import React from "react";
import { Image, Avatar, AvatarBadge, AvatarGroup, Box } from '@chakra-ui/react'


export default function ProfilePicture({ picture }) {
   return (

    <Avatar src='https://bit.ly/broken-link' 
      boxSize="300px"
      alt={"profile picture"}
      fit={"cover"}
      align={"center"}
       />
   /*
   {!picture ? Avatar : Image} noe sånt noe
   
   <Image
         rounded={"md"}
         alt={"profile picture"}
         src={picture}
         fit={"cover"}
         align={"center"}
         w={"100%"}
         h={{ base: "100%", sm: "200px", lg: "200px" }} />
    */
   );
}
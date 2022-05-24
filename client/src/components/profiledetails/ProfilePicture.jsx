import React from "react";
import { Image, Avatar, AvatarBadge, AvatarGroup, Box } from '@chakra-ui/react'


export default function ProfilePicture({ picture }) {
   return (

    
   
   <Avatar src={picture || 'https://bit.ly/broken-link'} 
   boxSize="300px"
   alt={"profile picture"}
   fit={"cover"}
   align={"center"}
    />
   
   

   );
}
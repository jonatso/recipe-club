import React from "react";
import { Text, Stack, Avatar } from "@chakra-ui/react";

export default function Details({ owner, date, picture }) {
   return (
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
         <Avatar
                src={picture || 'https://bit.ly/broken-link'}
                alt={'Author'}
            />
         <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{owner || "Achim Rolle"}</Text>
            {/* It should be possible to make a function for the read time based on length of method */}
            <Text color={"gray.500"}>{date}</Text>
         </Stack>
      </Stack>
   );
}

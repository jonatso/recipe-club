import React from "react";
import { Box, Image } from "@chakra-ui/react";

export default function PreviewPicture({ picture }) {
   return (
      <Box h={"15em"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
         <Image boxSize={"100%"} src={picture} layout={"fill"} objectFit={"cover"} alt={"Picture missing"} />
      </Box>
   );
}

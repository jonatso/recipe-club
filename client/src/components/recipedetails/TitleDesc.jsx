import React from "react";
import { HStack, Stack, Box, Heading, Text, useColorModeValue, Avatar, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Rating from "../../core_ui/Rating";
import SavedModal from "./SavedModal";

export default function TitleDesc({
   name,
   difficulty,
   description,
   username,
   time,
   userId,
   picture,
   points,
   numberOfRatings,
   savers,
}) {
   return (
      <Stack spacing={2}>
         <Box>
            <Heading lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
               {name}
            </Heading>
            <Rating mt={5} mb={5} points={points} numberOfRatings={numberOfRatings} />
            <SavedModal savers={savers}></SavedModal>
            <Text
               color={difficulty == 1 ? "green.500" : difficulty == 2 ? "yellow.500" : "red.500"}
               textTransform={"uppercase"}
               fontWeight={800}
               fontSize={"xl"}
               letterSpacing={1.1}
            >
               {difficulty == 1 ? "Easy" : difficulty == 2 ? "Medium" : "Hard"} ({time} min)
            </Text>
            <NextLink
               href={`http://localhost:3000/profile/${userId}`}
               _hover={{
                  cursor: "pointer",
               }}
            >
               <Link>
                  <HStack pt={5} pb={5}>
                     <Avatar size={"sm"} src={picture || "https://bit.ly/broken-link"} />
                     <Text>{username}</Text>
                  </HStack>
               </Link>
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

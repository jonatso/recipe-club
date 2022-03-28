import React from "react";
import { Stack, HStack, Heading, Button, Box, Text } from "@chakra-ui/react";
import Rating from "../../core_ui/Rating";

export default function RatingCard({ rating, ...props }) {
   return (
      <Box
         mt={2}
         rounded={"lg"}
         bg={"gray.100"}
         _dark={{ bg: "gray.700" }}
         boxShadow={"lg"}
         p={8}
         spacing={2}
         alignSelf="center"
         width={"70%"}
         {...props}
      >
         <Text>Rated by: {rating.username}</Text>
         <Rating points={rating.value} mt={2} mb={2} />
         <Text>{rating.comment}</Text>
      </Box>
   );
}

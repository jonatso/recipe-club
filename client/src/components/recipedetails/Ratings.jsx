import React, { useState } from "react";
import { Stack, HStack, Heading, Button } from "@chakra-ui/react";
import RatingCard from "./RatingCard";
import RatingForm from "./RatingForm";

export default function Ratings({ recipe, ratings, me }) {
   const [open, setIsOpen] = useState(false);
   return (
      <Stack pb={5}>
         <Heading mb={2} lineHeight={1.1} fontWeight={800} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
            Ratings
         </Heading>
         <Button colorScheme={"yellow"} size={"sm"} width={"10em"} ml={2} onClick={() => setIsOpen(true)}>
            Rate this recipe
         </Button>
         <RatingForm open={open} setIsOpen={setIsOpen} recipe={recipe} />
         {ratings === undefined ? (
            <div>There are no ratings</div>
         ) : (
            <>{ratings[0] ? ratings.map((rating) => <RatingCard key={rating.id} rating={rating} me={me} />) : null}</>
         )}
      </Stack>
   );
}

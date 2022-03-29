import React, { useEffect, useState } from "react";
import { Stack, HStack, Heading, Button, Box, Text } from "@chakra-ui/react";
import Rating from "../../core_ui/Rating";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function RatingCard({ rating, numberOfRatings, me, ...props }) {
   const queryClient = useQueryClient();

   const [errMsg, setErrMsg] = useState("");
   useEffect(() => {
      setErrMsg("");
   }, []);

   const deleteMutation = useMutation(async (id) => {
      try {
         const response = await axios(`http://localhost:4000/recipes/deleteRate/${id}`, {
            method: "DELETE",
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         if (!err?.response) {
            setErrMsg("No server");
            return err;
         }
         if (err.response?.status === 400) {
            setErrMsg("Something went wrong");
            return err;
         }
         setErrMsg("We can't resovle your delete at this moment");
         return err;
      }
   });

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
         <HStack justify={"space-between"}>
            <Text>Rated by: {rating.username}</Text>
            {me.username === rating.username ? (
               <Button
                  colorScheme={"red"}
                  onClick={async () => {
                     try {
                        const response = await deleteMutation.mutateAsync(rating.id, {
                           onSuccess: () => {
                              queryClient.invalidateQueries("ratings");
                              queryClient.invalidateQueries("recipe");
                           },
                        });
                     } catch (err) {
                        deleteMutation.reset();
                        console.log(err);
                     }
                  }}
               >
                  Delete
               </Button>
            ) : null}
         </HStack>
         <Rating points={rating.value} numberOfRatings={numberOfRatings} mt={2} mb={2} />
         <Text>{rating.comment}</Text>
      </Box>
   );
}

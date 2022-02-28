import axios from "axios";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import Shopping from "./Shopping";

export default function Loggedin() {
   const queryClient = useQueryClient();
   const logoutMutation = useMutation(
      async () =>
         axios("http://localhost:4000/logout", {
            method: "POST",
            withCredentials: true,
         }),
      {
         onSuccess: () => {
            queryClient.invalidateQueries("me");
         },
      }
   );

   return (
      <>
         <Shopping />
         <Button
            size="md"
            colorScheme="teal"
            onClick={() => {
               logoutMutation.mutate();
            }}
            isLoading={logoutMutation.isLoading}
            type="submit"
         >
            Logout
         </Button>
      </>
   );
}

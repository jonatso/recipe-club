import axios from "axios";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import Shopping from "./Shopping";

export default function Loggedin() {
   return (
      <>
         {/* <Shopping /> */}
         <Button
            variant="link"
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

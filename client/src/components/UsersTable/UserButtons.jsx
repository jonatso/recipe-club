import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import UserDeleteButton from "./UserDeleteButton";

export default function UserButtons({ id }) {
   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      setErrMsg("");
   }, []);

   const fetchMe = async () => {
      const response = await axios.get("http://localhost:4000/me", {
         withCredentials: true,
      });
      return response.data;
   };

   const me = useQuery("me", fetchMe);

   if (me.isLoading) {
      return <span>Loading recipe...</span>;
   }

   if (me.isError) {
      return <span>Error: {error}</span>;
   }

   return (
      <>
         {me.isSuccess && me.data !== null ? (
            <>
               {me.data.id === id ? (
                  <ButtonGroup>
                     <Button mr={2}>Edit</Button>
                     <UserDeleteButton id={id} />
                  </ButtonGroup>
               ) : null}
            </>
         ) : null}
      </>
   );
}

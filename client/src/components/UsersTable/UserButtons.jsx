import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Link } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import UserDeleteButton from "./UserDeleteButton";

export default function UserButtons({ id, name }) {
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
      return <span>Error</span>;
   }

   return (
      <>
         {me.isSuccess && me.data !== null && me.data ? (
            <>
               {me.data.id === id || me.data.isSuperuser ? (
                  <ButtonGroup>
                     {/*  <Button mr={2}>Edit</Button> */}
                     <UserDeleteButton id={id} />
                  </ButtonGroup>
               ) : (
                  <Link
                     href={
                        `mailto:owner@recipeclub.com?
Subject=User report: ` +
                        name +
                        `&body=My username (optional): ` +
                        me.data.username +
                        `%0D%0A
I wish to report user ` +
                        name +
                        ` for the following behaveour which is against website policy (add X where apropriate):%0D%0A
   - Offensive behaveour: %0D%0A
   - Rude language: %0D%0A
   - Personal attacks: %0D%0A
   - Impersonation: %0D%0A
   - Explicit content: %0D%0A
   - Encouraging violence: `
                     }
                  >
                     <ButtonGroup>
                        <Button colorScheme={"yellow"}>Report</Button>
                     </ButtonGroup>
                  </Link>
               )}
            </>
         ) : null}
      </>
   );
}

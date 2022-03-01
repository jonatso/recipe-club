import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import UserDeleteButton from "./UserDeleteButton";

export default function UserButtons({ id }) {
   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      setErrMsg("");
   }, []);

   return (
      <ButtonGroup>
         <Button mr={2}>Edit</Button>
         <UserDeleteButton id={id} />
      </ButtonGroup>
   );
}

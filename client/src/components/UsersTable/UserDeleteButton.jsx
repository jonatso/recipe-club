import React, { useState, useEffect } from "react";
import {
   Button,
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverHeader,
   PopoverArrow,
   PopoverCloseButton,
   PopoverBody,
   PopoverFooter,
   ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import Router from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UserDeleteButton({ id }) {
   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      setErrMsg("");
   }, []);

   const queryClient = useQueryClient();

   const deleteMutation = useMutation(async (uid) => {
      try {
         const response = await axios(`http://localhost:4000/users/delete/${uid}`, {
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

   const [isOpen, setIsOpen] = useState(false);
   const open = () => setIsOpen(!isOpen);
   const close = () => setIsOpen(false);

   return (
      <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={close} closeOnBlur={false}>
         <PopoverTrigger>
            <Button
               color={"white"}
               backgroundColor="red.500"
               _hover={{
                  backgroundColor: "red.700",
               }}
               onClick={open}
               ml={5}
               leftIcon={<DeleteIcon />}
            >
               Delete
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>{errMsg ? "Error: " + errMsg : null} Are you sure you want to delete this user?</PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
               <ButtonGroup size="sm">
                  <Button variant="outline">Cancel</Button>
                  <Button
                     onClick={async () => {
                        try {
                           const response = await deleteMutation.mutateAsync(id, {
                              onSuccess: () => {
                                 queryClient.invalidateQueries("me");
                                 queryClient.invalidateQueries("users");
                                 queryClient.invalidateQueries("user");
                                 queryClient.invalidateQueries("recipes");
                                 queryClient.invalidateQueries("recipe");
                                 queryClient.invalidateQueries("ratings");
                              },
                           });
                           if (response.message.includes("User deleted")) {
                              Router.push("/");
                           }
                           return response.data;
                        } catch (err) {
                           console.log(err);
                           return err;
                        }
                     }}
                     color={"white"}
                     backgroundColor="red.500"
                     _hover={{
                        backgroundColor: "red.700",
                     }}
                  >
                     Apply
                  </Button>
               </ButtonGroup>
            </PopoverFooter>
         </PopoverContent>
      </Popover>
   );
}

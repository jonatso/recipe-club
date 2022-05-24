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

export default function RecipeDeleteButton({ deleteAction }) {

   const [isOpen, setIsOpen] = useState(false);
   const open = () => setIsOpen(!isOpen);
   const close = () => setIsOpen(false);

   return (
      <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={close} closeOnBlur={false}>
         <PopoverTrigger>
            <Button color={"white"} backgroundColor="red.500" _hover={{
               backgroundColor: "red.700"
            }} onClick={open} ml={5} leftIcon={<DeleteIcon/>}>
               Delete
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
             Are you sure you want to delete this recipe?
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
               <ButtonGroup size="sm">
                  <Button variant="outline">Cancel</Button>
                  <Button
                     onClick={deleteAction}
                     color={"white"} backgroundColor="red.500" _hover={{
                        backgroundColor: "red.700"
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

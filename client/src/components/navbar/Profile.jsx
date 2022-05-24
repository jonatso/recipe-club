import React, { ReactNode } from "react";
import {
   Box,
   Flex,
   Avatar,
   HStack,
   Link,
   IconButton,
   Button,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuDivider,
   useDisclosure,
   useColorModeValue,
   Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Loggedin from "./Loggedin";
import NavLink from "./NavLink";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile({ id, picture }) {
   const queryClient = useQueryClient();
   const router = useRouter();

   const logoutMutation = useMutation(
      async () =>
         axios("http://localhost:4000/logout", {
            method: "POST",
            withCredentials: true,
         }),
      {
         onSuccess: () => {
            queryClient.invalidateQueries("me");
            queryClient.invalidateQueries("recipes");
         },
      }
   );

   const { isOpen, onOpen, onClose } = useDisclosure();
   const fetchMe = async () => {
      const response = await axios.get("http://localhost:4000/me", {
         withCredentials: true,
      });
      return response.data;
   };
   const me = useQuery("me", fetchMe, {
      enabled: router.isReady,
   });

   return (
      <>
         <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
               <IconButton
                  size={"md"}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  aria-label={"Open Menu"}
                  display={{ md: "none" }}
                  onClick={isOpen ? onClose : onOpen}
               />

               <Flex alignItems={"center"}>
                  <Menu>
                     <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                        <Avatar size={"sm"} src={picture || "https://bit.ly/broken-link"} />
                     </MenuButton>
                     <MenuList>
                        <MenuItem>
                           <NavLink name="Profile" url={`/profile/${me.data.id}`} style={{ textDecoration: "none" }} />
                        </MenuItem>
                        <MenuItem
                           onClick={() => {
                              logoutMutation.mutate();
                           }}
                           style={{ textDecoration: "none" }}
                        >
                           <NavLink name="Logout" url={"/"} style={{ textDecoration: "none" }} />
                        </MenuItem>
                     </MenuList>
                  </Menu>
               </Flex>
            </Flex>
         </Box>
      </>
   );
}

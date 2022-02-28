import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import NavLink from "./NavLink";
import Loggedin from "./Loggedin";
import LoginRegister from "./LoginRegister";
import MoonSun from "./MoonSun";

const Pages = [{ name: "About", url: "/about" }];

export default function Links({ isOpen, toggleColorMode, color }) {
   const fetchMe = async () => {
      const response = await axios.get("http://localhost:4000/me", {
         withCredentials: true,
      });
      return response.data;
   };

   const { data } = useQuery("me", fetchMe);

   return (
      <Box display={{ base: isOpen ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
         <Stack
            as={"nav"}
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
         >
            <MoonSun toggle={toggleColorMode} color={color} />
            {Pages.map((page) => (
               <NavLink key={page.name} name={page.name} url={page.url} />
            ))}

            {data ? <Loggedin /> : <LoginRegister />}
         </Stack>
      </Box>
   );
}

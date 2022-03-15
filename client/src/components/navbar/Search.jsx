import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchBar = () => (
   <form action="/" method="get">
      <InputGroup>
         <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
         <Input type="search" placeholder="Search for recipe" name="q" />
      </InputGroup>
   </form>
);

export default SearchBar;

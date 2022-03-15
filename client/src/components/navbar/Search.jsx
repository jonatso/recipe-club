import React, { useState } from "react";
// import { SearchIcon } from "@chakra-ui/icons";
// import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

// export default function Search() {
//    const [value, setValue] = React.useState("");
//    const handleChange = (event) => setValue(event.target.value);
//    return (
//       <InputGroup>
//          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
//          <Input value={value} onChange={handleChange} type="search" placeholder="Search for recipe" />
//       </InputGroup>
//    );
// }

const SearchBar = () => (
   <form action="/" method="get">
      <label htmlFor="header-search">
         <span className="visually-hidden">Search blog posts</span>
      </label>
      <input type="text" id="header-search" placeholder="Search blog posts" name="q" />
      <button type="submit">Search</button>
   </form>
);

export default SearchBar;

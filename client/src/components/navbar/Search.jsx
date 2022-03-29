import React, { useState} from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

function SearchBar({q, setQuery}) { 
   //const [query, setQuery] = useState(q);
   console.log(q);
   //console.log(query);
   return (
      <form action="/" method="get">
         <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input type="search" placeholder="Search for recipe" name="q" value={q} onChange={(e) => setQuery(e.target.value)} />
         </InputGroup>
      </form>
   );
}

export default SearchBar;

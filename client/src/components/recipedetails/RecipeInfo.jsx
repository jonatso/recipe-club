import React from "react";
import { Stack } from "@chakra-ui/react";
import AddIngredient from "./AddIngredient";
import TitleDesc from "./TitleDesc";
import IngredientTable from "./IngredientTable";
import Method from "./Method";

export default function RecipeInfo({ recipe }) {
   return (
      <>
         {recipe.creator.username ? (
            <Stack spacing={{ base: 6, md: 10 }}>
               <TitleDesc
                  name={recipe.name}
                  difficulty={recipe.difficulty}
                  description={recipe.description}
                  username={recipe.creator.username}
                  time={recipe.time}
                  points={recipe.points}
                  numberOfRatings={recipe.numberOfRatings}
               />
               <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                  <IngredientTable ingredients={recipe.ingredients} />
                  <Method method={recipe.method} />
               </Stack>

               {/* <AddIngredient /> */}
            </Stack>
         ) : null}
      </>
   );
}

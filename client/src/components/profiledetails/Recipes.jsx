import React from "react";
import { SimpleGrid } from '@chakra-ui/react';
import { useQuery } from "react-query";
import RecipeCard from "../RecipeCard";
import axios from "axios";

export default function Recipes({id, getSaved}) {
    console.log("getting recipes:", getSaved)
    const fetchRecipes = async () => {
        console.log("fetching:", getSaved)

        try {
           const response = await axios.get(`http://localhost:4000/recipes/${getSaved ? "saved" : "user"}/${id}`, {
              withCredentials: true,
           });
           return response.data;
        } catch (err) {
           console.log(err);
           return err;
        }
     };
  
     const recipes = useQuery("recipes", fetchRecipes);
     console.log(recipes);
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={3} pt={10} pb={10}>
            {recipes.isSuccess ? (
               <>
                  {recipes.data[0] ? (
                     recipes.data.map((recipe) => <RecipeCard key={recipe.name + recipe.id} recipe={recipe} />)
                  ) : (
                     <span>There are no recipes...</span>
                  )}
               </>
            ) : null}
         </SimpleGrid>
    )
}
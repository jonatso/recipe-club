import React from "react";
import { SimpleGrid, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "react-query";
import RecipeCard from "../components/RecipeCard";
import PageContainer from "../core_ui/PageContainer";
import LinkButton from "../core_ui/LinkButton";

export default function Home() {
   const fetchRecipes = async () => {
      try {
         const response = await axios.get("http://localhost:4000/recipes", {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   const { data, error, isLoading, isError } = useQuery("recipes", fetchRecipes);

   if (isLoading) {
      return <span>Loading...</span>;
   }

   if (isError) {
      return <span>Error: {error.message}</span>;
   }

   return (
      <PageContainer>
         <SimpleGrid columns={[1, 2, 3]} spacing={3}>
            {data.map((recipe) => (
               <RecipeCard key={recipe.name + recipe.id} recipe={recipe} />
            ))}
         </SimpleGrid>

         <LinkButton
            colorScheme="teal"
            size="lg"
            isRound={true}
            position="fixed"
            right="1em"
            bottom="1em"
            url={"/recipes/new"}
            icon={<Icon as={FaPlus} />}
         />
      </PageContainer>
   );
}

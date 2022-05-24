import React from "react";
import { SimpleGrid, TabPanels, Tabs, Tab, TabPanel, TabList, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "react-query";
import RecipeCard from "../RecipeCard";
import axios from "axios";
import { useQueryClient } from "react-query";

export default function RecipeTabs({ id, profile }) {
   const queryClient = useQueryClient();

   const fetchUserRecipes = async () => {
      try {
         const response = await axios.get(`http://localhost:4000/recipes/${"user"}/${id}`, {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };
   const fetchSavedRecipes = async () => {
      try {
         const response = await axios.get(`http://localhost:4000/recipes/${"saved"}/${id}`, {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   const userRecipes = useQuery(`userRecipes${id}`, fetchUserRecipes);
   const savedRecipes = useQuery(`savedRecipes${id}`, fetchSavedRecipes);

   return (
      <Tabs align="center" colorScheme="teal" pt={5}>
         <TabList>
            <Tab
               fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"}
               pt={5}
            >
               {profile.username}'s recipes
            </Tab>
            <Tab
               fontSize={{ base: "16px", lg: "18px" }}
               color={useColorModeValue("yellow.500", "yellow.300")}
               fontWeight={"500"}
               textTransform={"uppercase"}
               mb={"4"}
               pt={5}
            >
               {profile.username}'s liked recipes
            </Tab>
         </TabList>
         <TabPanels align="left">
            <TabPanel>
               <SimpleGrid columns={[1, 2, 3]} spacing={3}>
                  {userRecipes.isSuccess ? (
                     <>
                        {userRecipes.data[0] ? (
                           userRecipes.data.map((recipe) => (
                              <RecipeCard key={recipe.name + recipe.id} recipe={recipe} />
                           ))
                        ) : (
                           <span>There are no recipes...</span>
                        )}
                     </>
                  ) : null}
               </SimpleGrid>
            </TabPanel>
            <TabPanel>
               <SimpleGrid columns={[1, 2, 3]} spacing={3}>
                  {savedRecipes.isSuccess ? (
                     <>
                        {savedRecipes.data[0] ? (
                           savedRecipes.data.map((recipe) => (
                              <RecipeCard key={recipe.name + recipe.id} recipe={recipe} />
                           ))
                        ) : (
                           <span>There are no recipes...</span>
                        )}
                     </>
                  ) : null}
               </SimpleGrid>
            </TabPanel>
         </TabPanels>
      </Tabs>
   );
}

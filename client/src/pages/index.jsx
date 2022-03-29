import React, { useEffect, useState} from "react";
import { SimpleGrid, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "react-query";
import RecipeCard from "../components/RecipeCard";
import PageContainer from "../core_ui/PageContainer";
import LinkButton from "../core_ui/LinkButton";
import SearchBar from "../components/navbar/Search";
import { useRouter } from 'next/router'

export default function Home() {
   const [recipes, setRecipes] = useState([]);
   const router = useRouter();
   const [query, setQuery] = useState("");
   
   useEffect(()=>{
      if(!router.isReady) return;
      console.log("Query : ", router.query.q);
      setQuery(router.query.q);
      fetchRecipes().then(res => {
         console.log(res);
         setRecipes(res);
         

      });

   }, [router.isReady]);

   const fetchRecipes = async () => {

      console.log("fetching recipes", router.query.q);
      try {
         let url = `http://localhost:4000/recipes`;
         if (router.query.q) {
            url += `/search/?q=${router.query.q}`
         }
         console.log(url)
         const response = await axios.get(url, {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   // const recipes = useQuery("recipes", fetchRecipes);


   console.log(recipes)

   const fetchMe = async () => {
      const response = await axios.get("http://localhost:4000/me", {
         withCredentials: true,
      });
      return response.data;
   };

   const me = useQuery("me", fetchMe);

   if (me.isLoading || recipes.isLoading) {
      return <span>Loading...</span>;
   }

   if (me.isError || recipes.isError) {
      return <span>Error</span>;
   }

   return (
      <PageContainer>
         <SearchBar q={query} setQuery={setQuery}/>
         <SimpleGrid columns={[1, 2, 3]} spacing={3} mt={5}>
            {true  || recipes.isSuccess ? (
               <>
                  {recipes[0] ? (
                     recipes.map((recipe) => <RecipeCard key={recipe.name + recipe.id} recipe={recipe} />)
                  ) : (
                     <span>There are no recipes...</span>
                  )}
               </>
            ) : null}
         </SimpleGrid>

         {me.isSuccess && me.data !== null ? (
            <>
               {me.data.id === null || me.data.id === undefined ? null : (
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
               )}
            </>
         ) : null}
      </PageContainer>
   );
}

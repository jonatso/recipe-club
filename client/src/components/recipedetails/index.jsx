import React from "react";
import Container from "./Container";
import RecipePicture from "./RecipePicture";
import RecipeInfo from "./RecipeInfo";
import Ratings from "./Ratings";
import axios from "axios";
import { useQuery } from "react-query";
import PageContainer from "../../core_ui/PageContainer";

export default function RecipeDetails({ recipe, ratings, me }) {
   return (
      <>
         <Container>
            <RecipePicture picture={recipe.picture} />
            <RecipeInfo recipe={recipe} />
         </Container>
         <PageContainer>
            <Ratings recipe={recipe} ratings={ratings} me={me} />
         </PageContainer>
      </>
   );
}

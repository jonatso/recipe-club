import React, { useState } from "react";
import Container from "./Container";
import PreviewPicture from "./PreviewPicture";
import PreviewInfo from "./PreviewInfo";
import Details from "./Details";
import Rating from "../../core_ui/Rating";

export default function RecipeCard({ recipe }) {
   const date = new Date(recipe.createdAt).toDateString();
   const [isHoveredOver, setIsHoveredOver] = useState(false);

   return (
      <Container id={recipe.id} setHover={(bool) => setIsHoveredOver(bool)} isHoveredOver={isHoveredOver}>
         <PreviewPicture picture={recipe.picture} />
         <PreviewInfo
            name={recipe.name}
            description={recipe.description}
            isHoveredOver={isHoveredOver}
            difficulty={recipe.difficulty}
            time={recipe.time}
         />
         <Rating points={recipe.points} numberOfRatings={recipe.numberOfRatings} />
         <Details owner={recipe.creator.username} date={date} />
      </Container>
   );
}

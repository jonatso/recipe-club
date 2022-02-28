import React from "react";
import Container from "./Container";
import RecipePicture from "./RecipePicture";
import RecipeInfo from "./RecipeInfo";

export default function RecipeDetails({ recipe }) {
	return (
		<Container>
			<RecipePicture picture={recipe.picture} />
			<RecipeInfo recipe={recipe} />
		</Container>
	);
}

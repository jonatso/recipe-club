import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import RecipeCard from "../components/recipecard";
import dummyRecipes from "../helpers/dummydata";

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState(dummyRecipes);

	
	return (
		<div>
			{recipes.map((recipe) => (
				<RecipeCard name={recipe.name} description={recipe.description}/>
			))}
		</div>
	);
}

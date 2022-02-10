import React, { useState, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import RecipeCard from "../components/recipecard";
import dummyRecipes from "../helpers/dummydata";

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState(dummyRecipes);

	
	return (
		<div>
			<SimpleGrid columns={[1, 2, 3]} spacing={3}>
			{recipes.map((recipe) => (
				<RecipeCard name={recipe.name} description={recipe.description} id={recipe.id} image={recipe.image}/>
			))}
			</SimpleGrid>
		</div>
	);''
}
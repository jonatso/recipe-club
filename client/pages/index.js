import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, IconButton, Center } from "@chakra-ui/react";
import RecipeCard from "../components/recipecard";
import dummyRecipes from "../helpers/dummydata";
import { FaPlus } from "react-icons/fa";
import NextLink from 'next/link';

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:4000/recipe")
			.then(res => res.json())
			.then(data => {
				setRecipes(data);
			});
		setLoading(false);
	}, []);
	
	
	return (
		<div>
			<SimpleGrid columns={[1, 2, 3]} spacing={3}>
			{recipes.map((recipe) => (
				<RecipeCard name={recipe.name} description={recipe.description} id={recipe.id} picture={recipe.picture}/>
			))}
			</SimpleGrid>
			<NextLink href="/recipes/new">
			<IconButton
				colorScheme='teal'
				size='lg'
				icon={<FaPlus />}
				isRound={true}
				position="fixed"
				right="10px"
				bottom="10px"
				boxShadow='2xl'
			/></NextLink>
		</div>
	);
}
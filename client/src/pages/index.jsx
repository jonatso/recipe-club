import React, { useState } from "react";
import { SimpleGrid, IconButton } from "@chakra-ui/react";
import RecipeCard from "../components/recipecard";
import dummyRecipes from "../helpers/dummydata.jsx";
import { FaPlus } from "react-icons/fa";
import NextLink from "next/link";
import PageContainer from "../core_ui/pageContainer";
import LinkButton from "../core_ui/LinkButton";

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState(dummyRecipes);

	return (
		<PageContainer>
			<SimpleGrid columns={[1, 2, 3]} spacing={3}>
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.name} recipe={recipe} />
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
				icon={<FaPlus />}
			/>
		</PageContainer>
	);
}

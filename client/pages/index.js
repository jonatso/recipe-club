import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import RecipeCard from "../components/recipecard";

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState([
		{
			id: 1,
			name: "Pizza",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
			description: "This pizza is delicious",
		},
		{
			id: 2,
			name: "Burger",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},

				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
			description: "This burger is the best. My favourite recipe",
		},
		{
			id: 3,
			name: "Pasta",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 4,
					name: "Pasta",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 5,
					name: "Salt",
					quantity: "1",
					unit: "kg",
				},
			],
			description: "This pasta is delicious with EXTRA dough!"
			}
	]);

	
	return (
		<div>
			{recipes.map((recipe) => (
				<RecipeCard name={recipe.name} description={recipe.description}/>
			))}
		</div>
	);
}

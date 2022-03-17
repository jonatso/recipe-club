const dummyRecipes = [
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
		method:
			"Make the dough. Put the tomato and cheese in the dough. Bake for 20 minutes",
		difficulty: "Hard",
		picture:
			"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/tbagzeanc4qhrnlanzgi/pizza-med-pepperoni",
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
		method:
			"Make the dough. Put the tomato and cheese in the dough. Bake for 20 minutes",
		difficulty: "easy",
		picture:
			"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/abt0dcva6rkllmw3w9kg/klassisk-angusburger-med-cheddar-bacon-og-sprostekt-lok",
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
		description: "This pasta is delicious with EXTRA dough!",
		method:
			"Make the dough. Put the tomato and cheese in the dough. Bake for 20 minutes",
		difficulty: "medium",
		picture:
			"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/tulcxcntmwnys5ndgqvk/pasta-alfredo",
	},
	{
		id: 4,
		name: "Taco",
		ingredients: [
			{
				id: 4,
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
		description: "This taco is delicious with EXTRA dough!",
		method:
			"Make the dough. Put the tomato and cheese in the dough. Cook for 20 minutes",
		difficulty: "easy",
		picture:
			"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/jffnb4pcmzdollfqub0h/klassisk-norsk-taco-fersk-og-hjemmelaget",
	},
];

module.exports = dummyRecipes;

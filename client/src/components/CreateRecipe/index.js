import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
} from "@chakra-ui/react";
import { InputField } from "../InputField";

// TODO: Validations, Styling, Connect to db

export const CreateRecipe = () => {
	const ingredientValues = { name: "", quantity: "", unit: "" };

	return (
		<Formik
			initialValues={{
				name: "",
				description: "",
				ingredients: [{ name: "", quantity: "", unit: "" }],
				method: "",
				picture: "",
				difficulty: "",
			}}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
					fetch('http://localhost:4000/recipe', {
						method: 'POST',
						headers: {
						  'Content-Type': 'application/json',
						},
						body: JSON.stringify(values, null, 2),
					  })
				}, 500);
			}}
		>
			{(props) => (
				<Form>
					<InputField name="name" placeholder="name" label="Name" type="name" />
					<InputField
						textarea
						name="description"
						placeholder="description"
						label="Description"
						type="description"
					/>
					<FieldArray name="ingredients">
						{(arrayHelpers) => (
							<>
								<Button onClick={() => arrayHelpers.push(ingredientValues)}>
									Add Ingredient
								</Button>
								{props.values.ingredients.map((ingredient, index) => {
									return (
										<Box key={index}>
											<InputField
												placeholder="ingredient name"
												name={`ingredients.${index}.name`}
											/>
											<InputField
												name={`ingredients.${index}.quantity`}
												placeholder="quantity"
											/>
											<InputField
												name={`ingredients.${index}.unit`}
												placeholder="unit"
											/>
											
											<Button onClick={() => arrayHelpers.remove(index)}>
												x
											</Button>
										</Box>
									);
								})}
							</>
						)}
					</FieldArray>
					<InputField
						textarea
						name="method"
						placeholder="method"
						label="Method"
						type="method"
					/>
					<InputField
						name="picture"
						placeholder="picture url"
						label="Picture"
					/>
					<InputField
						name="difficulty"
						placeholder="difficulty"
						label="difficulty"
					/>
					<Button
						mt={4}
						colorScheme="teal"
						isLoading={props.isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

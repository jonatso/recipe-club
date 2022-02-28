import React from "react";
import {
	Box,
	Button,
	Stack,
	Heading,
	useColorModeValue,
	Select,
	FormControl,
	FormLabel,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import { Formik, Form, FieldArray, Field } from "formik";
import InputField from "../../core_ui/InputField";
import { DeleteIcon } from "@chakra-ui/icons";

export default function NewRecipe() {
	const ingredientValues = { name: "", quantity: "", unit: "" };

	return (
		<Formik
			initialValues={{
				name: "",
				description: "",
				ingredients: [ingredientValues],
				method: "",
				difficulty: "",
			}}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}, 500);
			}}
		>
			{(props) => (
				<Form>
					<Stack spacing={8} mx={"auto"} maxW={"lg"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Create Recipe
						</Heading>
						<Box
							rounded={"lg"}
							bg={useColorModeValue("gray.100", "gray.700")}
							boxShadow={"lg"}
							p={8}
							spacing={2}
						>
							<Stack spacing={3}>
								<InputField
									name="name"
									placeholder="name"
									label="Name"
									type="name"
									isRequired={true}
								/>
								<InputField
									textarea
									name="description"
									placeholder="description"
									label="Description"
									type="description"
									isRequired={true}
								/>
								<FormControl isRequired={true}>
									<FormLabel id="ingredients" htmlFor={"ingredients"}>
										Ingredients
									</FormLabel>
									<FieldArray name="ingredients">
										{(arrayHelpers) => (
											<>
												{props.values.ingredients.map((ingredient, index) => {
													return (
														<Flex key={index} align={"center"}>
															<InputField
																placeholder="ingredient"
																name={`ingredients.${index}.name`}
																mr={2}
																isRequired={true}
															/>
															<InputField
																name={`ingredients.${index}.quantity`}
																placeholder="quantity"
																type="number"
																mr={2}
																isRequired={true}
															/>
															<Field
																as={Select}
																name={`ingredients.${index}.unit`}
																placeholder="Select unit"
																mr={2}
																isRequired={true}
															>
																<option value="kg">kg</option>
																<option value="g">g</option>
																<option value="L">L</option>
																<option value="dL">dL</option>
																<option value="mL">mL</option>
																<option value="tbsp">tbsp</option>
																<option value="tsp">tsp</option>
															</Field>
															<IconButton
																bg={"red.500"}
																size={"md"}
																icon={<DeleteIcon />}
																aria-label={"Delete ingredient"}
																onClick={() => arrayHelpers.remove(index)}
															/>
														</Flex>
													);
												})}
												<Button
													mt={2}
													size="md"
													colorScheme="teal"
													onClick={() => arrayHelpers.push(ingredientValues)}
												>
													Add ingredient
												</Button>
											</>
										)}
									</FieldArray>
								</FormControl>
								<InputField
									textarea
									name="method"
									placeholder="method"
									label="Method"
									type="method"
									isRequired={true}
								/>
								<FormControl isRequired={true}>
									<FormLabel id="difficulty" htmlFor="difficulty">
										Difficulty
									</FormLabel>
									<Field
										as={Select}
										name="difficulty"
										placeholder="Select difficulty"
										isRequired={true}
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Field>
								</FormControl>
								<Button
									mt={4}
									colorScheme="teal"
									isLoading={props.isSubmitting}
									type="submit"
								>
									Submit
								</Button>
							</Stack>
						</Box>
					</Stack>
				</Form>
			)}
		</Formik>
	);
}

import React from "react";
import NextLink from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Formik, Form, Field, FieldArray } from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Stack,
    Textarea,
    Tooltip,
    useClipboard,
    useColorModeValue,
    VStack,
    Select,
    Grid,
  } from '@chakra-ui/react';
import { InputField } from "../../components/form/InputField";
import { FaTrash, FaPlus } from "react-icons/fa";

// TODO: Validations, Styling, Connect to db

export default function CreateRecipe() {
	const ingredientValues = { name: "", quantity: 1, unit: "" };

	return (
		<>
		<NextLink href="/"> 
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              marginLeft={50}
              marginTop={10}
              leftIcon={<BiLeftArrowAlt />}>
                Back
            </Button>
        </NextLink>
		<Flex
      
        align="center"
        justify="center"
        
        id="contact">
        <Box
        
          p={{ base: 0, lg: 13 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 8 }}>
              <Heading
                fontSize={{
                  base: '4xl',
                  md: '5xl',
                }}>
                Create a recipe
              </Heading>
  
              
                <Box
                  width="500px"
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  boxShadow={'2xl'}
                  p={8}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
			<Formik
						initialValues={{
							name: "",
							description: "",
							ingredients: [{ name: "", quantity: 1, unit: "" }],
							method: "",
							picture: "",
							difficulty: "",
						}}
						onSubmit={(values, actions) => {
							//button doesn't spin anymore :(
							actions.setSubmitting(true);
							fetch('http://localhost:4000/recipe', {
								method: 'POST',
								headers: {
								'Content-Type': 'application/json',
								},
								body: JSON.stringify(values, null, 2),
							}).then(actions.setSubmitting(false))
						}}
					>
						{(props) => (
							<Form>
								<VStack spacing={5}>
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
										<div>
											<FormLabel>
												Ingredients
											</FormLabel>
											{props.values.ingredients.map((ingredient, index) => {
												return (
													<Box key={index}>
														<Grid templateColumns='45% 15% 15% auto' gap={4}>
															<InputField
																placeholder="ingredient"
																name={`ingredients.${index}.name`}
															/>
															<InputField
																name={`ingredients.${index}.quantity`}
																placeholder="1"
																type="number"
															/>
															<InputField
																name={`ingredients.${index}.unit`}
																placeholder="unit"
															/>
															<IconButton 
															onClick={() => arrayHelpers.remove(index)}
															marginTop="auto"
															variant={'solid'}
															colorScheme={'red'}
															icon={<FaTrash />}
															/>
					
															
														</Grid>
														
													</Box>
												);
												
											})}
											<Button
												marginTop="10px"
												onClick={() => arrayHelpers.push(ingredientValues)}
												variant={'solid'}
												colorScheme={'teal'}
												size={'sm'}
												mr={4}
												leftIcon={<FaPlus />}
											>
												Add ingredient
											</Button>
										</div>
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
									isFullWidth
								>
									Submit
								</Button>
							</VStack>
							</Form>
						)}
					</Formik>
				
				</Box>
			</VStack>
			</Box>
        </Box>
      </Flex>
	  </>
	);
};

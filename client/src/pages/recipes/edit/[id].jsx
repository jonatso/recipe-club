import React, { useState, useEffect } from "react";
import {
   Box,
   Button,
   Stack,
   Heading,
   Select,
   FormControl,
   FormLabel,
   Flex,
   IconButton,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   NumberIncrementStepper,
   NumberDecrementStepper,
} from "@chakra-ui/react";
import { Formik, Form, FieldArray, Field } from "formik";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import InputField from "../../../core_ui/InputField";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Router from "next/router";
import LinkButton from "../../../core_ui/LinkButton";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function EditRecipe() {
   const router = useRouter();
   const pid = router.query.id;
   const queryClient = useQueryClient();
   const [initialData, setInitialData] = useState();

   const [errMsg, setErrMsg] = useState("");

   const fetchRecipe = async (id) => {
      try {
         const response = await axios.get(`http://localhost:4000/recipes/${id}`, {
            withCredentials: true,
         });
         return response.data;
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   const fetchMe = async () => {
      const response = await axios.get("http://localhost:4000/me", {
         withCredentials: true,
      });
      return response.data;
   };

   const recipe = useQuery("recipe", () => fetchRecipe(pid), {
      enabled: router.isReady,
   });
   const ingredientValues = { name: "", quantity: "", unit: "" };

   const initializeData = (data, success) => {
      if (!success) {
         return null;
      }
      return {
         name: data.name,
         description: data.description,
         ingredients: data.ingredients,
         method: data.method,
         picture: data.picture,
         difficulty: data.difficulty,
         time: data.time,
      };
   };

   useEffect(() => {
      setErrMsg("");
   }, []);

   const recipeMutation = useMutation(async (newRecipe) => {
      try {
         const response = await axios.put(
            `http://localhost:4000/recipes/update/${pid}`,
            { ...newRecipe },
            {
               withCredentials: true,
            }
         );
         return response.data;
      } catch (err) {
         console.log(err);
         if (!err?.response) {
            setErrMsg("No server");
            return err;
         }
         if (err.response?.status === 400) {
            setErrMsg("Could not create recipe");
            return err;
         }
         setErrMsg("We can't resovle your creation at this moment");
         return err;
      }
   });
   if (recipe.isLoading) {
      return <div>Loading</div>;
   }
   return (
      <>
         <LinkButton
            text={"Back"}
            textColor={"white"}
            bgColor={"orange.400"}
            bgColorHover={"organge.300"}
            url={`/recipes/${pid}`}
            leftIcon={<ArrowBackIcon />}
            ml={5}
         />
         <Formik
            initialValues={initializeData(recipe.data, recipe.isSuccess)}
            onSubmit={async (values, actions) => {
               try {
                  actions.setSubmitting(true);
                  const response = await recipeMutation.mutateAsync(values, {
                     onSuccess: () => {},
                  });
                  if (response.message) {
                     Router.push(`/recipes/${pid}`);
                  }
               } catch (err) {
                  recipeMutation.reset();
                  actions.setSubmitting(false);
               }
            }}
         >
            {(props) => (
               <Form>
                  <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                     <Heading fontSize={"4xl"} textAlign={"center"}>
                        Edit Recipe
                     </Heading>
                     <Box rounded={"lg"} bg={"gray.100"} _dark={{ bg: "gray.700" }} boxShadow={"lg"} p={8} spacing={2}>
                        <Stack spacing={4}>
                           {errMsg === "" ? null : (
                              <Box rounded={"lg"} bg={"red.400"} boxShadow={"lg"} p={8}>
                                 {errMsg}
                              </Box>
                           )}
                           <InputField name="name" placeholder="name" label="Name" type="name" isRequired={true} />
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
                                       {props.values !== null && props.values.ingredients !== null
                                          ? props.values.ingredients.map((ingredient, index) => (
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
                                                     <option value="pcs">pcs</option>
                                                  </Field>
                                                  <IconButton
                                                     bg={"red.500"}
                                                     size={"md"}
                                                     icon={<DeleteIcon />}
                                                     aria-label={"Delete ingredient"}
                                                     onClick={() => arrayHelpers.remove(index)}
                                                  />
                                               </Flex>
                                            ))
                                          : null}
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
                           <InputField name="picture" placeholder="picture url" label="Picture url" type="url" />
                           <FormControl isRequired={true}>
                              <FormLabel id="difficulty" htmlFor="difficulty">
                                 Difficulty
                              </FormLabel>
                              <Field as={Select} name="difficulty" placeholder="Select difficulty" isRequired={true}>
                                 <option value="1">Easy</option>
                                 <option value="2">Medium</option>
                                 <option value="3">Hard</option>
                              </Field>
                           </FormControl>
                           <InputField
                              name="time"
                              placeholder="time estimate"
                              label="Time estimate (minutes)"
                              type="number"
                              isRequired={true}
                           />
                           <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                              Submit
                           </Button>
                        </Stack>
                     </Box>
                  </Stack>
               </Form>
            )}
         </Formik>
      </>
   );
}

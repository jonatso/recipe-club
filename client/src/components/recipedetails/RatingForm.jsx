import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Heading, Select, FormControl, FormLabel, Flex, IconButton } from "@chakra-ui/react";
import { Formik, Form, FieldArray, Field } from "formik";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Router from "next/router";
import InputField from "../../core_ui/InputField";

export default function RatingForm({ open, setIsOpen, recipe }) {
   const [errMsg, setErrMsg] = useState("");
   const queryClient = useQueryClient();

   const rateMutation = useMutation(async (newRating) => {
      try {
         const response = await axios.post(
            `http://localhost:4000/recipes/rate/${recipe.id}`,
            { ...newRating },
            {
               withCredentials: true,
            }
         );
         return response.data;
      } catch (err) {
         if (!err?.response) {
            setErrMsg("No server");
            return err;
         }
         if (err.response?.status === 400) {
            setErrMsg("Could not create rating");
            return err;
         }
         setErrMsg("We can't resovle your creation at this moment");
         return err;
      }
   });

   useEffect(() => {
      setErrMsg("");
   }, []);

   if (!open) {
      return null;
   }

   return (
      <Formik
         initialValues={{
            value: "",
            comment: "",
         }}
         onSubmit={async (values, actions) => {
            try {
               actions.setSubmitting(true);
               const response = await rateMutation.mutateAsync(values, {
                  onSuccess: () => {
                     queryClient.invalidateQueries("ratings");
                     queryClient.invalidateQueries("rater");
                  },
               });
               if (response.id) {
                  setIsOpen(false);
               }
            } catch (err) {
               rateMutation.reset();
               actions.setSubmitting(false);
            }
         }}
      >
         {(props) => (
            <Form>
               <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                     Rate Recipe
                  </Heading>
                  <Box rounded={"lg"} bg={"gray.100"} _dark={{ bg: "gray.700" }} boxShadow={"lg"} p={8} spacing={2}>
                     <Stack spacing={4}>
                        {errMsg === "" ? null : (
                           <Box rounded={"lg"} bg={"red.400"} boxShadow={"lg"} p={8}>
                              {errMsg}
                           </Box>
                        )}
                        <FormControl isRequired={true}>
                           <FormLabel id="value" htmlFor="value">
                              Rating
                           </FormLabel>
                           <Field as={Select} name="value" placeholder="Select Rating" isRequired={true}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                           </Field>
                        </FormControl>
                        <InputField textarea name="comment" placeholder="comment" label="Comment" type="comment" />

                        <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
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

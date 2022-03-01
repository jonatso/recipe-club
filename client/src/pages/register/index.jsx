import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, Box, Text, Heading, Button, Stack } from "@chakra-ui/react";
import Router from "next/router";
import NextLink from "next/link";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import InputField from "../../core_ui/InputField";

export default function Register() {
   const [showPassword, setShowPassword] = useState(false);
   const passwordToggle = () => {
      setShowPassword(!showPassword);
   };
   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      setErrMsg("");
   }, []);

   const queryClient = useQueryClient();

   const registerMutation = useMutation(async (newUser) => {
      try {
         const response = await axios.post(
            "http://localhost:4000/register",
            { ...newUser },
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
            setErrMsg("Username or Email already taken");
            return err;
         }
         setErrMsg("Register faild");
         return err;
      }
   });

   return (
      <Formik
         initialValues={{
            username: "",
            email: "",
            password: "",
         }}
         onSubmit={async (values, actions) => {
            try {
               actions.setSubmitting(true);
               const response = await registerMutation.mutateAsync(values, {
                  onSuccess: () => {
                     queryClient.invalidateQueries("me");
                  },
               });
               if (response.id) {
                  Router.push("/");
               }
            } catch (err) {
               registerMutation.reset();
               actions.setSubmitting(false);
            }
         }}
      >
         {(props) => (
            <Form>
               <Stack data-testid="signupContainer" spacing={8} mx={"auto"} maxW={"lg"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                     Sign up
                  </Heading>

                  <Box rounded={"lg"} bg={"gray.100"} _dark={{ bg: "gray.700" }} boxShadow={"lg"} p={8}>
                     <Stack spacing={4}>
                        {errMsg === "" ? null : (
                           <Box rounded={"lg"} bg={"red.400"} boxShadow={"lg"} p={8}>
                              {errMsg}
                           </Box>
                        )}
                        <InputField
                           data-testid="username"
                           name="username"
                           placeholder="username"
                           label="Username"
                           type="username"
                           isRequired={true}
                        />
                        <InputField name="email" placeholder="email" label="Email" type="email" data-testid="email" isRequired={true} />
                        <InputField
                           name="password"
                           placeholder="password"
                           label="Password"
                           data-testid="password"
                           isRequired={true}
                           password={true}
                           type={showPassword ? "text" : "password"}
                           showPassword={showPassword}
                           togglePassword={() => passwordToggle()}
                        />
                        <Button size="lg" colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                           Register
                        </Button>
                        <Text align={"center"}>
                           Already a user?{" "}
                           <NextLink href={"/login"} passHref>
                              <Link color={"blue.400"}>Login</Link>
                           </NextLink>
                        </Text>
                     </Stack>
                  </Box>
               </Stack>
            </Form>
         )}
      </Formik>
   );
}

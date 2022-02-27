import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
	Link,
	Box,
	Text,
	Heading,
	Button,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import Router from "next/router";
import NextLink from "next/link";
import InputField from "../../core_ui/InputField";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

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
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No server");
			} else if (err.response?.status === 400) {
				setErrMsg("Username or Email already taken");
			} else {
				setErrMsg("Register faild");
			}
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
				actions.setSubmitting(true);
				await registerMutation.mutate(values, {
					onSuccess: () => {
						Router.push("/");
						queryClient.invalidateQueries("me");
					},
				});
				registerMutation.reset();
				actions.setSubmitting(false);
			}}
		>
			{(props) => (
				<Form>
					<Stack spacing={8} mx={"auto"} maxW={"lg"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Sign up
						</Heading>

						<Box
							rounded={"lg"}
							bg={useColorModeValue("gray.100", "gray.700")}
							boxShadow={"lg"}
							p={8}
						>
							<Stack spacing={4}>
								{errMsg === "" ? null : (
									<Box rounded={"lg"} bg={"red.400"} boxShadow={"lg"} p={8}>
										{errMsg}
									</Box>
								)}
								<InputField
									name="username"
									placeholder="username"
									label="Username"
									type="username"
									isRequired={true}
								/>
								<InputField
									name="email"
									placeholder="email"
									label="Email"
									type="email"
									isRequired={true}
								/>
								<InputField
									name="password"
									placeholder="password"
									label="Password"
									isRequired={true}
									password={true}
									type={showPassword ? "text" : "password"}
									showPassword={showPassword}
									togglePassword={() => passwordToggle()}
								/>
								<Button
									size="lg"
									colorScheme="teal"
									isLoading={props.isSubmitting}
									type="submit"
								>
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

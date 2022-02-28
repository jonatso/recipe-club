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

	const loginMutation = useMutation(async (user) => {
		try {
			await axios.post(
				"http://localhost:4000/login",
				{ ...user },
				{
					withCredentials: true,
				}
			);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No server");
				return err;
			} else if (err.response?.status === 400) {
				setErrMsg("Something went wrong");
				return err;
			} else {
				setErrMsg("We can't resovle your login at this moment");
				return err;
			}
		}
	});

	return (
		<Formik
			initialValues={{
				usernameOrEmail: "",
				password: "",
			}}
			onSubmit={async (values, actions) => {
				try {
					actions.setSubmitting(true);
					const error = await loginMutation.mutateAsync(values, {
						onSuccess: () => {
							queryClient.invalidateQueries("me");
						},
					});
					if (!error) {
						Router.push("/");
					}
				} catch (err) {
					loginMutation.reset();
					actions.setSubmitting(false);
				}
			}}
		>
			{(props) => (
				<Form>
					<Stack spacing={8} mx={"auto"} maxW={"lg"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Login
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
									name="usernameOrEmail"
									placeholder="username or email"
									label="Username or Email"
									type="username"
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
									Login
								</Button>
								<Text align={"center"}>
									<NextLink href={"/login"} passHref>
										<Link color={"blue.400"}>Forgot password?</Link>
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
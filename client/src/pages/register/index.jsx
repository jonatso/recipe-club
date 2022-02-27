import React, { useState } from "react";
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

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const passwordToggle = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Formik
			initialValues={{
				username: "",
				email: "",
				password: "",
			}}
			onSubmit={async (values, { setErrors }) => {
				try {
					const response = await fetch("http://localhost:4000/register", {
						method: "POST",
						headers: {
							"Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_URL}`,
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify(values),
					});

					if (response.status !== 200) {
						throw new Error("Could not register user");
					}
				} catch (err) {
					setErrors(err);
				}

				Router.push("/");
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

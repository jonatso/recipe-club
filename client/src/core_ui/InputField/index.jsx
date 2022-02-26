import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputRightElement,
	InputGroup,
	Textarea,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";
import { useField } from "formik";

export default function InputField({
	label,
	textarea,
	size: _,
	isRequired,
	password,
	showPassword,
	togglePassword,
	...props
}) {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error} isRequired={isRequired}>
			<FormLabel id={field.name} htmlFor={field.name}>
				{label}
			</FormLabel>
			{textarea ? (
				<Textarea
					{...field}
					name={props.name}
					placeholder={props.placeholder}
					type={props.type}
					id={field.name}
				></Textarea>
			) : (
				<InputGroup>
					<Input {...field} {...props} id={field.name} />
					{!password ? null : (
						<InputRightElement h={"full"}>
							<Button variant={"ghost"} onClick={togglePassword}>
								{showPassword ? <ViewIcon /> : <ViewOffIcon />}
							</Button>
						</InputRightElement>
					)}
				</InputGroup>
			)}
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
}

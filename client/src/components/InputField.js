import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useField } from "formik";

export const InputField = ({ label, textarea, size: _, ...props }) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
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
				<Input {...field} {...props} id={field.name} />
			)}
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};

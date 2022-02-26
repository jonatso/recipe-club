import React from "react";
import { Button } from "@chakra-ui/react";

export default function NavButton({ name, color, click, isLoading }) {
	return (
		<Button
			color={color}
			size="md"
			onClick={() => click()}
			isLoading={isLoading}
		>
			{name}
		</Button>
	);
}

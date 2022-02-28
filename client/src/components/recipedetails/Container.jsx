import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

export default function Container({ children }) {
	return (
		<SimpleGrid
			columns={{ base: 1, lg: 2 }}
			spacing={{ base: 8, md: 10 }}
			py={{ base: 18, md: 10 }}
			m={5}
		>
			{children}
		</SimpleGrid>
	);
}

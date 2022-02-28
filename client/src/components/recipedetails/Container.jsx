import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import PageContainer from "../../core_ui/pageContainer";

export default function Container({ children }) {
	return (
		<PageContainer>
			<SimpleGrid
				columns={{ base: 1, lg: 2 }}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 18, md: 10 }}
			>
				{children}
			</SimpleGrid>
		</PageContainer>
	);
}

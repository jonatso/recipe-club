import React from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";

export default function PageContainer({ children }) {
	return <Container maxW={"7xl"}>{children}</Container>;
}

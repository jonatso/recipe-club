import { Box, useColorModeValue, Center } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Container({ children, id }) {
	return (
		<NextLink href={"/recipes/" + id}>
			<Box
				cursor={"pointer"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"md"}
				p={6}
				overflow={"hidden"}
			>
				{children}
			</Box>
		</NextLink>
	);
}

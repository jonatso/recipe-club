import React from "react";
import { Box, Heading, Text, Stack, useColorModeValue } from "@chakra-ui/react";

export default function PreviewInfo({ name, description }) {
	return (
		<Stack>
			<Text
				color={"green.500"}
				textTransform={"uppercase"}
				fontWeight={800}
				fontSize={"sm"}
				letterSpacing={1.1}
			>
				Type
			</Text>
			<Heading
				color={useColorModeValue("gray.700", "white")}
				fontSize={"2xl"}
				fontFamily={"body"}
			>
				{name}
			</Heading>
			<Box minHeight={"3em"}>
				<Text color={"gray.500"}>
					{description.slice(0, 50)}
					{description[51] ? "..." : null}
				</Text>
			</Box>
		</Stack>
	);
}

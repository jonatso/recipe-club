import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function Method({ method }) {
	return (
		<Box>
			<Text
				fontSize={{ base: "16px", lg: "18px" }}
				color={useColorModeValue("yellow.500", "yellow.300")}
				fontWeight={"500"}
				textTransform={"uppercase"}
				mb={"4"}
			>
				Method
			</Text>
			{method}
		</Box>
	);
}

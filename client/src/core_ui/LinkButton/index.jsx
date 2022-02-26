import React from "react";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

export default function LinkButton({
	text,
	textColor,
	bgColor,
	bgColorHover,
	url,
}) {
	return (
		<NextLink href={url}>
			<Button
				display={{ base: "block", md: "block" }}
				fontSize={"md"}
				fontWeight={500}
				color={textColor}
				bg={bgColor}
				href={url}
				_hover={{
					bg: bgColorHover,
				}}
			>
				{text}
			</Button>
		</NextLink>
	);
}

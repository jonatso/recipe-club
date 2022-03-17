import React from "react";
import NextLink from "next/link";
import { Button, IconButton } from "@chakra-ui/react";

export default function LinkButton({
	text,
	textColor,
	bgColor,
	bgColorHover,
	url,
	icon,
	...props
}) {
	return (
		<NextLink href={url}>
			{icon ? (
				<IconButton
					fontSize={"md"}
					fontWeight={500}
					color={textColor}
					bg={bgColor}
					href={url}
					_hover={{
						bg: bgColorHover,
					}}
					icon={icon}
					{...props}
				/>
			) : (
				<Button
					fontSize={"md"}
					fontWeight={500}
					color={textColor}
					bg={bgColor}
					href={url}
					_hover={{
						bg: bgColorHover,
					}}
					{...props}
				>
					{text}
				</Button>
			)}
		</NextLink>
	);
}

import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

export default function NavLink({ name, url }) {
	const isCurrent = useRouter().route === url;

	return (
		<NextLink href={url} passHref>
			<Link _hover={{ textDecoration: "none" }}>
				<Text
					p={2}
					display="block"
					textDecoration={isCurrent ? "underline" : "none"}
					_hover={{
						textDecoration: "underline",
					}}
				>
					{name}
				</Text>
			</Link>
		</NextLink>
	);
}

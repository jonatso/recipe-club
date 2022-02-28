import React from "react";
import { Image } from "@chakra-ui/react";

export default function RecipePicture({ picture }) {
	return (
		<Image
			rounded={"md"}
			alt={"product image"}
			src={picture}
			fit={"cover"}
			align={"center"}
			w={"100%"}
			h={{ base: "100%", sm: "400px", lg: "500px" }}
		/>
	);
}

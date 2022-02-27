import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function MoonSun({ toggle, color }) {
	return (
		<IconButton
			size={"md"}
			icon={color === "light" ? <MoonIcon /> : <SunIcon />}
			aria-label={"Toggle dark mode"}
			display={{ base: "block" }}
			onClick={toggle}
		/>
	);
}

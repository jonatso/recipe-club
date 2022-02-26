import React from "react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Hamburger({ toggle, isOpen }) {
	return (
		<IconButton
			size={"md"}
			icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
			aria-label={"Open Menu"}
			display={{ md: "none" }}
			onClick={toggle}
		/>
	);
}

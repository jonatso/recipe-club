import React, { useState } from "react";
import { useColorMode } from "@chakra-ui/react";

import Container from "./Container";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import Links from "./Links";

export default function NavBar() {
	const { color, toggleColorMode } = useColorMode();
	const [isOpen, setOpen] = useState(false);
	const hamburgerToggle = () => {
		setOpen(!isOpen);
	};

	return (
		<Container>
			<Logo />
			<Hamburger toggle={hamburgerToggle} isOpen={isOpen} />
			<Links isOpen={isOpen} toggleColorMode={toggleColorMode} color={color} />
		</Container>
	);
}

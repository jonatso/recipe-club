import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export default function Shopping() {
	return (
		<Button
			variant={"solid"}
			colorScheme={"teal"}
			size={"sm"}
			mr={4}
			leftIcon={<Icon as={FaShoppingCart} />}
		>
			Shopping List
		</Button>
	);
}

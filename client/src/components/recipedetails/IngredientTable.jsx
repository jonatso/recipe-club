import React from "react";
import {
	Box,
	Text,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	Table,
	useColorModeValue,
} from "@chakra-ui/react";

export default function IngredientTable({ ingredients }) {
	return (
		<Box>
			<Text
				fontSize={{ base: "16px", lg: "18px" }}
				color={useColorModeValue("yellow.500", "yellow.300")}
				fontWeight={"500"}
				textTransform={"uppercase"}
				mb={"4"}
			>
				Ingredients
			</Text>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Ingredient</Th>
						<Th isNumeric>Quantity</Th>
						<Th>Unit</Th>
					</Tr>
				</Thead>
				<Tbody>
					{ingredients.map((ingredient) => (
						<Tr key={ingredient.id}>
							<Td>{ingredient.name}</Td>
							<Td isNumeric>{ingredient.quantity}</Td>
							<Td>{ingredient.unit}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}

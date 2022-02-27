import axios from "axios";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import Shopping from "./Shopping";
import { useMutation } from "react-query";

export default function Loggedin() {
	// TODO: REACT-QUERY PLS
	const logoutMutation = useMutation(async () => {
		return await axios("http://localhost:4000/logout", {
			method: "POST",
			withCredentials: true,
		});
	});

	return (
		<>
			<Shopping />
			<Button
				size="md"
				colorScheme="teal"
				onClick={() => {
					logoutMutation.mutate();
				}}
				isLoading={logoutMutation.isLoading}
				type="submit"
			>
				Logout
			</Button>
		</>
	);
}

import React from "react";
import { Text, Stack } from "@chakra-ui/react";

export default function Details({ owner, date }) {
	return (
		<Stack mt={6} direction={"row"} spacing={4} align={"center"}>
			{/* <Avatar
                src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                alt={'Author'}
            /> */}
			<Stack direction={"column"} spacing={0} fontSize={"sm"}>
				<Text fontWeight={600}>{owner ? owner : "Achim Rolle"}</Text>
				{/*It should be possible to make a function for the read time based on length of method*/}
				<Text color={"gray.500"}>
					{date ? date : "March 3rd 2022"} · 6 min read
				</Text>
			</Stack>
		</Stack>
	);
}

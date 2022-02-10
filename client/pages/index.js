import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	// useEffect(() => {
	// 	setLoading(true);
	// 	fetch(process.env.NEXT_PUBLIC_API_URL)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setData(data);
	// 			setLoading(false);
	// 		});
	// }, []);
	// if (isLoading) return <p>Loading...</p>;
	// if (!data) return <p>No data to display</p>;

	return (
		<div>
			{/* <h1>{data.message}</h1> */}
		</div>
	);
}

import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/navbar/index.jsx";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<NavBar />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;

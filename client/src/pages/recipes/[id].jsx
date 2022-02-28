import RecipeDetails from "../../components/recipedetails";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import LinkButton from "../../core_ui/linkButton";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Recipe() {
	const router = useRouter();
	const id = router.query.id;
	const fetchRecipe = async (id) => {
		try {
			const response = await axios.get("http://localhost:4000/recipes/" + id, {
				withCredentials: true,
			});
			return response.data;
		} catch (err) {
			console.log(err);
		}
	};

	const { data } = useQuery("recipe", () => fetchRecipe(id), {
		enabled: router.isReady,
	});
	return (
		<>
			<LinkButton
				text={"Back"}
				textColor={"white"}
				bgColor={"orange.400"}
				bgColorHover={"organge.300"}
				url={"/"}
				leftIcon={<ArrowBackIcon />}
				ml={5}
			/>
			{!data ? (
				<div>Could not fetch curret recipe</div>
			) : (
				<RecipeDetails recipe={data} />
			)}
		</>
	);
}

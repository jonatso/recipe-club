import React from "react";
import Container from "./Container";
import PreviewPicture from "./PreviewPicture";
import PreviewInfo from "./PreviewInfo";
import Details from "./Details";

export default function RecipeCard({ recipe }) {
	return (
		<Container id={recipe.id}>
			<PreviewPicture picture={recipe.picture} />
			<PreviewInfo name={recipe.name} description={recipe.description} />
			<Details owner={recipe.owner} date={recipe.date} />
		</Container>
	);
}

import React from "react";
import NavLink from "./NavLink";
import LinkButton from "../../core_ui/LinkButton";

export default function LoginRegister() {
	return (
		<>
			<NavLink name="Login" url={"/login"} />
			<LinkButton
				text={"Register"}
				textColor={"white"}
				bgColor={"orange.400"}
				bgColorHover={"organge.300"}
				url={"/register"}
			/>
		</>
	);
}

import React from "react";
import NavLink from "./NavLink";

export default function LoginRegister() {
	return (
		<>
			<NavLink name="Login" url={"/login"} />
			<NavLink name="Register" url={"/register"} />
		</>
	);
}

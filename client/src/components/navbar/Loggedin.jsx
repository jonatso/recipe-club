import React from "react";
import NavLink from "./NavLink";

export default function Loggedin({ logoutMutation }) {
	return (
		<>
			<Shopping />
			<NavLink name="Logout" onClick={() => logoutMutation()} />
		</>
	);
}

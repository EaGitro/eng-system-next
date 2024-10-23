"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

// import { Button } from "@/components/ui/button";

export default function LoginButton() {
	return (
		<Button  onClick={() => {console.log("signOut");return signIn()}}>
			Login
		</Button>
	);
}

"use client";

import { signIn } from "next-auth/react";

// import { Button } from "@/components/ui/button";

export default function LoginButton() {
	return (
		<button className="w-full" onClick={() => signIn()} type="button">
			ログイン
		</button>
	);
}

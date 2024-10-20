"use server";
import { signOut } from "next-auth/react";

export async function SignOut() {
	return (
		<form
			action={async () => {
				await signOut();
			}}
			className="w-full"
		>
			<button type="button">Sign Out</button>
		</form>
	);
}

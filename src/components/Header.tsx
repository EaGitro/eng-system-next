import Image from "next/image";
import { getServerSession } from "next-auth";

import Link from "~/components/Link";
import LoginButton from "~/components/LoginButton";
import LogoutButton from "~/components/LogoutButton";
import { authOptions } from "~/lib/auth";

export default async function Header({
	height,
	logoDisabled,
	logoLink,
	logoMsg
}: {
	height: string;
	logoDisabled?: boolean;
	logoLink?: string;
	logoMsg?: string
}) {
	const session = await getServerSession(authOptions);
	const logo = (
		<div
			style={{
				cursor: logoDisabled ? "not-allowed" : "pointer",
				height: "8vh",
				position: "relative",
				width: "12vw",
			}}
		// className="flex"
		>
			<Image
				alt="Top Image"
				fill
				objectFit="contain"
				sizes="(max-width: 768px) 10vh, (max-width: 1200px) 8vh, 5vh"
				src="/icon-light.svg"
			/>
		</div>
	);

	return (
		<header
			className="w-full py-4 px-6 flex justify-between items-center bg-background border-b"
			style={{
				height: height,
			}}
		>
			{logoDisabled ? (
				<button
					className="text-primary hover:text-primary/80 transition-colors"
					disabled={logoDisabled}
					// onClick={() => {
					//     if (!logoDisabled ) {
					//         redirect("/mypage")
					//     }
					// }}
					title={logoMsg ? logoMsg : undefined}
					type="button"
				>
					{logo}
				</button>
			) : (
				<Link href={logoLink ?? "/mypage"}>{logo}</Link>
			)}
			{session ? <LogoutButton /> : <LoginButton />}
		</header>
	);
}

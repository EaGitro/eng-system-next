import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { ShadcnH4 } from "~/components/shadcnCustomized/Typography";
import { authOptions } from "~/lib/auth";

export default async function Login({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const session = await getServerSession(authOptions);
	if (session) {
		const redirectPath = (await searchParams).redirect;
		switch (typeof redirectPath) {
			case "string":
				redirect(redirectPath);
			case "undefined":
				redirect("/mypage");
			case "object":
				redirect(redirectPath[0]);
		}
	}
	return (
		<>
			<ShadcnH4 className="p-4">
				お疲れ様でした。再度ログインする場合は右上のログインボタンからログインしてください。
			</ShadcnH4>
		</>
	);
	// if (session) {
	//     return (
	//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
	//             <p>Logged in as {session.user?.name}</p>
	//             <button
	//                 onClick={() => signOut()}
	//                 style={{
	//                     padding: '10px 20px',
	//                     backgroundColor: '#ff6347',
	//                     color: 'white',
	//                     borderRadius: '5px',
	//                     border: 'none',
	//                     cursor: 'pointer',
	//                 }}
	//             >
	//                 Logout
	//             </button>
	//         </div>
	//     );
	// } else {
	//     return (
	//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
	//             <p>Please log in with Google</p>
	//             <Link href="/api/auth/google">
	//                 <button
	//                     style={{
	//                         display: 'flex',
	//                         alignItems: 'center',
	//                         padding: '10px 20px',
	//                         backgroundColor: '#4285F4',
	//                         color: 'white',
	//                         borderRadius: '5px',
	//                         border: 'none',
	//                         cursor: 'pointer',
	//                     }}
	//                 >

	//                     <span style={{ marginLeft: '10px' }}>Login with Google</span>
	//                 </button>
	//             </Link>
	//         </div>
	//     );
	// }
}

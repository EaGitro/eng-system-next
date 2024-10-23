import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { SignIn } from "~/components/Signin";
// import { SignOut } from "~/components/SignOut";
import LoginButton from "~/components/LoginButton";
import LogoutButton from "~/components/LogoutButton";
import { ShadcnH2, ShadcnH4 } from "~/components/shadcnCustomized/Typography";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/lib/auth";

export default async function Login() {
	const session = await getServerSession(authOptions);
	if (session){
		redirect("/mypage")
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


import NextAuth from "next-auth"
// import { SignIn } from "~/components/Signin";
// import { SignOut } from "~/components/SignOut";
import LoginButton from "~/components/LoginButton";
import LogoutButton from "~/components/LogoutButton";
import { signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import Link from "next/link";


export default async function Login() {
    const session = await getServerSession(authOptions)
    return (
        <>
            {
                session && (
                    // console.log(session)
                    <>
                    <LogoutButton></LogoutButton>

                        {/* <p>{session.user.email}{session.user.id}{session.user.name}</p> */}
                    </>
                )
            }{
                !session && (

                    <LoginButton></LoginButton>
                )
            }
        </>
    )
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

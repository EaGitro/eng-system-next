
import Link from "~/components/Link"
import { User } from "lucide-react"
import { Button } from "~/components/ui/button"
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import LogoutButton from "~/components/LogoutButton";
import LoginButton from "~/components/LoginButton";
import { redirect } from "next/navigation";


export default async function Header({ height,  logoDisabled, logoMsg }: {
    height: string,
    logoDisabled?: boolean,
    logoMsg?: string
}) {
    const session = await getServerSession(authOptions);
    const logo = (
        <div
            style={{
                height: "8vh",
                width: "12vw",
                position: "relative",
                cursor: logoDisabled ? "not-allowed" : "pointer"
            }}
        // className="flex"
        >
            <Image
                src="/icon-light.svg"
                alt="Top Image"
                fill
                objectFit="contain"
                sizes="(max-width: 768px) 10vh, (max-width: 1200px) 8vh, 5vh"

            />
        </div>
    )


    return (
        <header className="w-full py-4 px-6 flex justify-between items-center bg-background border-b"
            style={{
                height: height
            }}
        >
            {
                (logoDisabled)  ? (
                    <button
                        type="button"
                        className="text-primary hover:text-primary/80 transition-colors"
                        // onClick={() => {
                        //     if (!logoDisabled ) {
                        //         redirect("/mypage")
                        //     }
                        // }}
                        disabled={logoDisabled}
                        title={logoMsg ? logoMsg : undefined}
                    >
                        {logo}
                    </button>
                ) : (
                    <Link href={"/mypage"}>
                        {logo}
                    </Link>
                )
            }
            {
                session
                    ? <LogoutButton />
                    : <LoginButton />
            }
        </header>
    )
}
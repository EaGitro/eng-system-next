import Link from "~/components/Link"
import { User } from "lucide-react"
import { Button } from "~/components/ui/button"
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import LogoutButton from "~/components/LogoutButton";
import LoginButton from "~/components/LoginButton";


export default async function Header({ height }: {
    height: string
}) {
    const session = await getServerSession(authOptions);



    return (
        <header className="w-full py-4 px-6 flex justify-between items-center bg-background border-b"
            style={{
                height: height
            }}
        >
            <Link
                href="/mypage"
                className="text-primary hover:text-primary/80 transition-colors"
                userId={session?.user.id}
            >
                <div
                    style={{
                        height: "8vh",
                        width: "12vw",
                        position: "relative"
                    }}
                >
                    <Image
                        src="/icon-light.svg" //配置した画像のパスを記述する。
                        alt="Top Image"
                        fill
                        objectFit="contain"
                        sizes="(max-width: 768px) 10vh, (max-width: 1200px) 8vh, 5vh"

                    />
                </div>
            </Link>
            {
                session
                    ? <LogoutButton />
                    : <LoginButton />
            }
        </header>
    )
}
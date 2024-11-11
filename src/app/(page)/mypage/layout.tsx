import Header from "~/components/Header"

export default function MypageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header
                height="10vh"
            />
            <main
                className="90vh"
            >
                {children}
            </main>

        </>
    )
} 
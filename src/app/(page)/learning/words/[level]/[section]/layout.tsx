import Header from "~/components/Header"

export default function WordsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header
                height="10vh"
                logoDisabled={true}
                logoMsg="最後のカードにある「学習を終了する」ボタンからホームに戻ってください"
            />
            <main
                className="90vh"
            >
                {children}
            </main>

        </>
    )
} 
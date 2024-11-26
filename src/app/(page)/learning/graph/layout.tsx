import Header from "~/components/Header";

export default function GraphLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header
				height="10vh"
				logoDisabled={true}
				logoMsg="「学習を終わる」ボタンからホームに戻ってください"
			/>
			<main className="90vh">{children}</main>
		</>
	);
}

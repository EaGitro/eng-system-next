import Header from "~/components/Header";

export default function SelectWordsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header height="10vh" logoLink={"/dev"} logoMsg="ホームへ" />
			<main className="90vh">{children}</main>
		</>
	);
}

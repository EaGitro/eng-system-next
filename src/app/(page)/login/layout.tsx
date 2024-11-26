import Header from "~/components/Header";

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header height="10vh" logoDisabled={true} />
			<main className="90vh">{children}</main>
		</>
	);
}

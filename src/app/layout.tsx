import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextAuthProvider } from "~/providers/NextAuth";
import "./globals.css";
import { WebVitals } from "~/components/WebVitals";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "necto",
	description: "the necto system",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<NextAuthProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col flex-auto`}
				>
					{/* <Header
						height="10vh"
					/> */}
					<WebVitals />
					{/* <main
					className="90vh"
					> */}
					{children}
					{/* </main> */}
				</body>
			</NextAuthProvider>
		</html>
	);
}

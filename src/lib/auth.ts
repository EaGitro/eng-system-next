import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();
export const authOptions = {
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ session, user }: { session: Session; user: User }) {
			if (session?.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
};

// export const { handler } = NextAuth(authOptions)

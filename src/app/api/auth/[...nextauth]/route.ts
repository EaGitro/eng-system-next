// import NextAuth, { NextAuthOptions }  from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default NextAuth({
//   adapter: PrismaAdapter(prisma)  as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: 'secret',
// });

// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaClient } from "@prisma/client"
// import { Adapter } from "next-auth/adapters";
 
// const prisma = new PrismaClient();
// // export const { handlers, auth, signIn, signOut }
// export const authOptions  = NextAuth({
//   adapter: PrismaAdapter(prisma) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? '', 
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//     }),
//   ],
// })

import NextAuth from "next-auth/next";

import { authOptions } from "~/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
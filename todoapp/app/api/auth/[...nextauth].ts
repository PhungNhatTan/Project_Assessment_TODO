import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialProvider({
            name: 'credentials',
            credentials: {
                identifier: { label: 'username or email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error('Invalid credential');
                }

                const user = await prisma.user.findFirst({
                    where:
                        { OR: [{ email: credentials.identifier }, { username: credentials.identifier }] }
                });

                if (!user || !user?.password) {
                    throw new Error('Incorrect username or password');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isCorrectPassword) {
                    throw new Error('Incorrect username or password');
                }

                return {
                    id: user.username,
                    email: user.email,
                    name: user.username,
                };
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
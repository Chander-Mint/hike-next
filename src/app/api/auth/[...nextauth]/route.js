import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/src/lib/models/userModel";
import bcrypt from "bcryptjs";
import connectDB from "@/src/lib/db/connectDB";

export const runtime = 'nodejs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                await connectDB();
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }
                return user;
            }
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/api/auth/error",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id?.toString();
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.role = token.role;
            return session;
        },
    },
});


export { handler as GET, handler as POST };

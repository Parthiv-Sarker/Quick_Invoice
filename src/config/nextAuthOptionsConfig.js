import GoogleProvider from "next-auth/providers/google";
import connectDB from "./dbConfig";
import UserModel from "@/models/user.model";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await connectDB(); // Ensure DB connection

            // Check if user exists
            const existingUser = await UserModel.findOne({ email: user.email });

            if (!existingUser) {
                // Create new user
                await UserModel.create({
                    fullname: user.name,
                    email: user.email,
                    // provider: account.provider,
                });
            }

            return true; // Allow sign-in
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                username: token.username,
                email: token.email,
            };
            return session;
        },
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

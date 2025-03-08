import { NextResponse } from "next/server";
import userModel from "@/models/user.model";
import connectDB from "@/config/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "All fields are required!!!" },
                { status: 400 }
            );
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials!!!" },
                { status: 401 }
            );
        }
        const userData = {
            _id: user._id,
            email: user.email,
            name: user.fullname,
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials!!!" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.NEXT_JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Setting token in HTTP-only cookie
        const response = NextResponse.json(
            { message: "Login Successful.", userData},
            { status: 200 }
        );
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NEXT_NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.log("Error logging in user:", error);
        return NextResponse.json(
            { error: "Internal Server Error!!!" },
            { status: 500 }
        );
    }
}

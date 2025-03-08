import { NextResponse } from "next/server";
import userModel from "@/models/user.model";
import connectDB from "@/config/dbConfig";

export async function POST(req) {
    try {
        await connectDB();

        const { fullname, email, password } = await req.json();

        if (!fullname || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required!!!" },
                { status: 400 }
            );
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists!!!" },
                { status: 400 }
            );
        }

        const newUser = new userModel({
            fullname,
            email,
            password,
        });

        await newUser.save();
        return NextResponse.json(
            { message: "Signup Successfull."},
            { status: 201 }
        );
    } catch (error) {
        console.log("Error creating user:", error);
        return NextResponse.json(
            { error: "Internal Server Error!!!" },
            { status: 500 }
        );
    }
}

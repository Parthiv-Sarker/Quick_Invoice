import { NextResponse } from "next/server";
import userModel from "@/models/user.model";
import connectDB from "@/config/dbConfig";
import jwtService from "@/lib/jwtService";

export async function GET(req) {
    try {
        const token = req.cookies.get("quick_invoice_session");
        const decodedToken = await jwtService.verifyToken(token);

        await connectDB();

        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return NextResponse.json(
                { error: "User is not register!!!" },
                { status: 401 }
            );
        }
        const userData = {
            _id: user._id,
            email: user.email,
            name: user.fullname,
            address: user?.address,
        };
        return NextResponse.json(
            { message: "successfully fetch the user.", data: userData },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error logging in user:", error);
        return NextResponse.json(
            { error: "Internal Server Error!!!" },
            { status: 500 }
        );
    }
}

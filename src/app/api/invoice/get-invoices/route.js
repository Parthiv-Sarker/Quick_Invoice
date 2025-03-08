import { NextResponse } from "next/server";

import connectDB from "@/config/dbConfig";
import userModel from "@/models/user.model";
import invoiceModel from "@/models/invoice.model";
import jwtService from "@/lib/jwtService";

export async function GET(req) {
    try {
        await connectDB();

        const tokenCookie = req.cookies.get("auth_token");
        if (!tokenCookie) {
            return NextResponse.json(
                { error: "Unauthorized access. Token missing!" },
                { status: 401 }
            );
        }
        const decodedToken = await jwtService.verifyToken(tokenCookie);

        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist!" },
                { status: 404 }
            );
        }

        const invoices = await invoiceModel.find({
            senderId: decodedToken.userId,
        });

        return NextResponse.json(
            { message: "Invoices retrieved successfully.", data: invoices },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching invoices:", error);
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}

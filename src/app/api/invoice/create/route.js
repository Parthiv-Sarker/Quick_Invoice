import { NextResponse } from "next/server";

import connectDB from "@/config/dbConfig";

import userModel from "@/models/user.model";
import invoiceModel from "@/models/invoice.model";

import jwtService from "@/lib/jwtService";

export async function POST(req) {
    try {
        const token = req.cookies.get("auth_token");
        const decodedToken = await jwtService.verifyToken(token);

        await connectDB();

        const data = await req.json();

        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist!" },
                { status: 400 }
            );
        }

        const invoice = await invoiceModel.create(data);

        return NextResponse.json(
            { message: "Invoice created successfully.", invoice },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error creating invoice:", error);
        return NextResponse.json(
            { error: "Internal Server Error!" },
            { status: 500 }
        );
    }
}

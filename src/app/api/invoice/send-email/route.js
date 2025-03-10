import { NextResponse } from "next/server";

import connectDB from "@/config/dbConfig";

import userModel from "@/models/user.model";
import invoiceModel from "@/models/invoice.model";

import jwtService from "@/lib/jwtService";
import { sendEmail } from "@/lib/resendEmailService";

export async function POST(req) {
    try {
        const token = req.cookies.get("quick_invoice_session");
        const decodedToken = await jwtService.verifyToken(token);

        await connectDB();

        const invoiceId = await req.json();

        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist!!!" },
                { status: 400 }
            );
        }

        const invoice = await invoiceModel.findById(invoiceId);
        if (!user) {
            return NextResponse.json(
                { error: "Invoice does not exist!!!" },
                { status: 400 }
            );
        }

        const payload = {
            user,
            invoice,
        };

        const res = await sendEmail(payload);

        return NextResponse.json(
            { message: "Invoice created successfully.", data: res },
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

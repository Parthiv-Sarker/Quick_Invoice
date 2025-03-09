import { NextResponse } from "next/server";
import connectDB from "@/config/dbConfig";
import invoiceModel from "@/models/invoice.model";

export async function PATCH(req) {
    try {
        await connectDB();

        const id = await req.json();

        if (!id) {
            return NextResponse.json(
                { error: "Invoice ID is required" },
                { status: 400 }
            );
        }

        const invoice = await invoiceModel.findByIdAndUpdate(
            id,
            { paymentStatus: "Paid" },
            { new: true }
        );

        if (!invoice) {
            return NextResponse.json(
                { error: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Invoice status updated successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

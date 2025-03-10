import { NextResponse } from "next/server";
import connectDB from "@/config/dbConfig";
import invoiceModel from "@/models/invoice.model";

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        
        if (!id) {
            return NextResponse.json(
                { error: "Invoice ID is required" },
                { status: 400 }
            );
        }

        const deletedInvoice = await invoiceModel.findByIdAndDelete(id);

        if (!deletedInvoice) {
            return NextResponse.json(
                { error: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Invoice deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

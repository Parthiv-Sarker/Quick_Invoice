import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

import connectDB from "@/config/dbConfig";
import userModel from "@/models/user.model";
import invoiceModel from "@/models/invoice.model";
import generatePdf from "@/lib/generatePdf";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Invoice ID is required!" },
                { status: 400 }
            );
        }

        const invoice = await invoiceModel.findById(id);
        if (!invoice) {
            return NextResponse.json(
                { error: "Invoice does not exist!" },
                { status: 404 }
            );
        }

        const user = await userModel.findById(invoice.senderId);
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist!" },
                { status: 404 }
            );
        }

        const signaturePath = path.join(process.cwd(), "public", "signature.png");
        const signatureImg = fs.readFileSync(signaturePath, "base64");
        const base64Signature = `data:image/png;base64,${signatureImg}`;

        // Generate PDF
        const pdfBuffer = await generatePdf(invoice, base64Signature);

        return new Response(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="invoice-${id}.pdf"`,
            },
        });
    } catch (error) {
        console.error("Error fetching invoices:", error);
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}

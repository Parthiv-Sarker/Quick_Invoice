import { NextResponse } from "next/server";
import connectDB from "@/config/dbConfig";
import invoiceModel from "@/models/invoice.model";

async function checkOverdueInvoices() {
    try {
        await connectDB();

        // Get current date
        const currentDate = new Date();

        // Find invoices that are overdue but not marked as "Overdue"
        const overdueInvoices = await invoiceModel.find({
            dueDate: { $lt: currentDate },
            status: { $ne: "Overdue" },
        });

        if (overdueInvoices.length === 0) {
            console.log("✅ No overdue invoices found.");
        } else {
            // Update overdue invoices
            await invoiceModel.updateMany(
                { _id: { $in: overdueInvoices.map((invoice) => invoice._id) } },
                { $set: { status: "Overdue" } }
            );
            console.log(
                `🚀 Updated ${overdueInvoices.length} invoices to 'Overdue' status.`
            );
        }
    } catch (error) {
        console.error("❌ Error checking overdue invoices:", error);
    } finally {
        // Run again after 5 minutes (300,000 ms)
        setTimeout(checkOverdueInvoices, 300000);
    }
}

checkOverdueInvoices();

export async function PATCH(req) {
    console.log("Invoice overdue check is running automatically.");
    
    return NextResponse.json({
        message: "Invoice overdue check is running automatically.",
    });
}

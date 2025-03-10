import cron from "node-cron";
import connectDB from "@/config/dbConfig";
import invoiceModel from "@/models/invoice.model";

async function checkOverdueInvoices() {
    try {
        await connectDB();

        const currentDate = new Date();
        const invoices = await invoiceModel.find({
            status: { $nin: ["Overdue", "Paid"] }, // Only pending invoices
        });

        let overdueInvoices = [];

        for (const invoice of invoices) {
            const dueDays = parseInt(invoice.dueDate, 10);
            if (isNaN(dueDays)) continue;

            const invoiceDate = new Date(invoice.date);
            const dueDate = new Date(invoiceDate);
            dueDate.setDate(invoiceDate.getDate() + dueDays);

            if (dueDate < currentDate) {
                overdueInvoices.push(invoice._id);
            }
        }

        if (overdueInvoices.length > 0) {
            await invoiceModel.updateMany(
                { _id: { $in: overdueInvoices } },
                { $set: { paymentStatus: "Overdue" } }
            );
            console.log(
                `\n🚀 Updated ${overdueInvoices.length} invoices to 'Overdue' status.\n`
            );
        } else {
            console.log("\n✅ No overdue invoices found.\n");
        }
    } catch (error) {
        console.error("❌ Error checking overdue invoices:", error);
    }
}

// Schedule the job to run every 5 minutes
cron.schedule("*/5 * * * *", () => {
    console.log("\n⏳ Running overdue invoice check...\n");
    checkOverdueInvoices();
});

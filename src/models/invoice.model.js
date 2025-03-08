import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNo: {
            type: String,
            required: true,
        },
        customer: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
            },
            address: {
                type: String,
            },
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        quantity: {
            type: Number,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Overdue"],
            default: "Pending",
        },
        dueDate: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

const invoiceModel =
    mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default invoiceModel;

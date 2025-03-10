"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import MyLoader from "@/components/myComponents/MyLoader";
import generatePdf from "@/lib/generatePdf";

const DownloadInvoice = ({ params }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const invoiceData = {
        _id: "1234567890abcdef12345678",
        invoiceName: "Website Development",
        invoiceNo: "INV-001",
        senderId: "abcdef1234567890abcdef12",
        client: {
            name: "John Doe",
            email: "johndoe@example.com",
            address: "1234 Elm Street, Apt 56, New York, NY 10001",
        },
        invoiceDate: new Date("2025-03-10"), // Example date
        dueDate: "15", // Days until due
        quantity: 5,
        rate: 500, // Price per unit
        currency: "USD",
        totalAmount: 2500, // quantity * rate
        paymentStatus: "Pending",
        notes: "Thank you for your business!",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                setIsLoading(true);

                const formattedInvoiceData = {
                    ...invoiceData,
                    invoiceDate: new Date(
                        invoiceData.invoiceDate
                    ).toLocaleDateString(),
                    createdAt: new Date(
                        invoiceData.createdAt
                    ).toLocaleDateString(),
                    updatedAt: new Date(
                        invoiceData.updatedAt
                    ).toLocaleDateString(),
                    totalAmount: Number(invoiceData.totalAmount),
                    quantity: Number(invoiceData.quantity),
                    rate: Number(invoiceData.rate),
                };

                // Generate PDF
                const pdfUrl = await generatePdf(formattedInvoiceData);
                console.log(pdfUrl);                
                setPdfUrl(pdfUrl);
            } catch (error) {
                console.error("Error fetching invoice:", error);
                toast.error("Failed to load invoice.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPdf();
    }, [params]);

    return (
        <div className="flex flex-col items-center justify-center w-full p-4">
            {isLoading ? (
                <MyLoader />
            ) : pdfUrl ? (
                <iframe src={pdfUrl} width="100%" height="600px"></iframe>

            ) : (
                <p className="text-center text-gray-500">No PDF available.</p>
            )}
        </div>
    );
};

export default DownloadInvoice;

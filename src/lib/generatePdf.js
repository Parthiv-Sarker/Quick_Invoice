import jsPDF from "jspdf";

import { formatDate } from "./formatDate";
import { calculateDueDate } from "./calculateDueDate";
import { formatCurrency } from "./formatCurrency";

const pdf = new jsPDF({
    orientation: "portrait",
    unit: "cm",
    format: "a4",
});

const generatePdf = async (invoiceData, signatureImg) => {
    let currency = "\u20B9";;
    pdf.setTextColor(0, 0, 0);

    // Set header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(45);
    pdf.text("INVOICE", 12, 4);
    pdf.setLineWidth(0.07);
    pdf.setDrawColor(0, 0, 0);
    pdf.line(2, 3.4, 11, 3.4);

    // Client details
    pdf.setFontSize(12);

    pdf.setFont("helvetica", "bold");
    pdf.text("ISSUED TO:", 2, 9.8);
    pdf.setFont("helvetica", "normal");
    pdf.text(invoiceData.client.name, 2, 10.5);
    pdf.text(invoiceData.client.email, 2, 11);
    pdf.text(invoiceData?.client?.address, 2, 11.5);

    pdf.setFont("helvetica", "bold");
    pdf.text("INVOICE NO: ", 13, 9.8);
    pdf.setFont("helvetica", "normal");
    pdf.text(invoiceData.invoiceNo, 16, 9.8);
    pdf.text("DATE: ", 14.3, 10.5);
    pdf.text(formatDate(invoiceData.date), 16, 10.5);
    pdf.text("DUE DATE: ", 13.3, 11);
    pdf.text(calculateDueDate(invoiceData.date, invoiceData.dueDate), 16, 11);

    pdf.setLineWidth(0.05);
    pdf.setDrawColor(140, 140, 140);
    pdf.line(2, 16.5, 19, 16.5);
    pdf.line(2, 18, 19, 18);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("DESCRIPTION", 2.5, 16);
    pdf.text("QUANTITY", 10, 16);
    pdf.text("RATE", 13, 16);
    pdf.text("TOTAL", 16, 16);
    // Value...
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(invoiceData.invoiceName, 2.6, 17.4);
    pdf.text(String(invoiceData.quantity), 10.8, 17.4);
    pdf.text(String(invoiceData.rate), 13.2, 17.4);
    pdf.text(String(invoiceData.totalAmount), 16.2, 17.4);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("SUBTOTAL ", 2.5, 18.8);
    pdf.text(String(invoiceData.totalAmount), 16.2, 18.8);
    pdf.text("TOTAL ", 13, 19.8);

    pdf.text(currency, 15.8, 19.8);
    pdf.text(String(invoiceData.totalAmount), 16.2, 19.8);

    if (invoiceData.notes) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("Note:", 2, 21);

        pdf.setFont("helvetica", "normal");

        // Wrap the text within a max width (e.g., 16 cm)
        const wrappedText = pdf.splitTextToSize(invoiceData.notes, 10);

        // Print the wrapped text starting at (3.5, 20) and auto-adjust lines
        pdf.setFontSize(10);
        pdf.text(wrappedText, 3.3, 21);
    }

    pdf.addImage(signatureImg, "PNG", 13, 22, 6, 3);

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    return pdfBuffer;
};

export default generatePdf;

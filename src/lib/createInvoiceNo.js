export const createInvoiceNo = (invoiceData) => {
    if (invoiceData.length === 0 || !invoiceData) {
        return "INV-001";
    }

    // Extract the last invoice number from the array
    const lastInvoice = invoiceData[invoiceData.length - 1];
    const lastInvoiceNo = lastInvoice.invoiceNo;
    
    // Extract the numeric part from "INV-XXX"
    const lastNumber = parseInt(lastInvoiceNo.split("-")[1], 10) || 0;

    // Increment and format the new invoice number
    const invoiceNo = `INV-${String(lastNumber + 1).padStart(3, "0")}`;

    return invoiceNo;
};

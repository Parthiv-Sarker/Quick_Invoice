export const calculateDueDate = (invoiceDate, dueDays) => {
    const date = new Date(invoiceDate);

    // Convert dueDays to a number and add to the invoice date
    date.setDate(date.getDate() + parseInt(dueDays, 10));

    // Return formatted date (e.g., "March 10, 2024")
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

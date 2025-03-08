export const formatCurrency = ({ amount, currency = "INR" }) => {
    if (isNaN(amount) || amount === undefined || amount === null) {
        return "Invalid amount";
    }
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
    }).format(amount);
};

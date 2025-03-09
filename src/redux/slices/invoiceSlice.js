import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    isLoading: false,
    invoiceData: [],
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setInvoiceData: (state, action) => {
            state.status = true;
            state.invoiceData = action.payload;
        },
        addInvoiceData: (state, action) => {
            state.invoiceData.push(action.payload);
        },
        updateInvoiceStatus: (state, action) => {
            const { id, status } = action.payload;            
            const index = state.invoiceData.findIndex(
                (data) => data._id === id
            );
            state.invoiceData[index].paymentStatus = status;
        },
        deleteInvoiceData: (state, action) => {            
            const id = action.payload;
            state.invoiceData = state.invoiceData.filter(
                (data) => data._id !== id
            );
        },
    },
});

export const {
    setLoading,
    setInvoiceData,
    addInvoiceData,
    updateInvoiceStatus,
    deleteInvoiceData,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

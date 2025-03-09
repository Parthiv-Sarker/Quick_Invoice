"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/formatCurrency";

import { useSelector } from "react-redux";

const PaidInvoiceList = () => {
    const { isLoading, invoiceData } = useSelector((state) => state.invoice);

    const paidInvoices = invoiceData.filter(
        (data) => data.paymentStatus === "Paid"
    );

    const sortedInvoices = [...paidInvoices].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Paid Invoice List</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <p className="text-center text-gray-500">
                        Loading invoices...
                    </p>
                ) : paidInvoices.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedInvoices.map((data) => (
                                <TableRow key={data?._id}>
                                    <TableCell className="font-semibold">
                                        {data?.clientName}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(data?.invoiceDate)}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {formatCurrency({
                                            amount: data?.totalAmount,
                                            currency: data?.currency,
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <h1 className="p-4 text-sm text-center text-gray-500">
                        No paid invoices found.
                    </h1>
                )}
            </CardContent>
        </Card>
    );
};

export default PaidInvoiceList;

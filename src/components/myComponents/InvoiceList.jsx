"use client";
import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import MyLoader from "./MyLoader";
import InvoiceAction from "./InvoiceAction";

import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/formatCurrency";

const InvoiceList = () => {
    const invoiceData = [];
    const isLoading = false;

    const paymentStatusColor = (paymentStatus) => {
        switch (paymentStatus) {
            case "Paid":
                return "bg-green-600";
            case "Pending":
                return "bg-yellow-500";
            case "Overdue":
                return "bg-red-600";
            default:
                return "bg-gray-600";
        }
    };

    // Sort invoices by date (newest first)
    const sortedInvoices = [...invoiceData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="p-4">
            {isLoading ? (
                <div className="">
                    <MyLoader />
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            {invoiceData.length > 0 ? (
                                <>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedInvoices.map((data) => (
                                            <TableRow key={data?._id}>
                                                <TableCell>
                                                    {data?.invoiceNo}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {data?.clientName}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        data?.invoiceDate
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {formatCurrency({
                                                        amount: data?.totalAmount,
                                                        currency:
                                                            data?.currency,
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`w-[4.5rem] flex justify-center items-center ${paymentStatusColor(data?.paymentStatus)}
                                                `}
                                                    >
                                                        {data?.paymentStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <InvoiceAction
                                                        invoiceId={data?._id}
                                                        currentStatus={
                                                            data?.paymentStatus
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </>
                            ) : (
                                <>
                                    <TableCaption className="p-10 text-lg text-center text-gray-500">
                                        No invoices found.
                                    </TableCaption>
                                </>
                            )}
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default InvoiceList;

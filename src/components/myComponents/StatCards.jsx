"use client";
import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { formatCurrency } from "@/lib/formatCurrency";

import { useSelector } from "react-redux";

const StatCards = () => {
    const { isLoading, invoiceData } = useSelector((state) => state.invoice); 

    const pendingInvoices = invoiceData.filter(
        (data) => data.paymentStatus === "Pending"
    );

    const overdueInvoices = invoiceData.filter(
        (data) => data.paymentStatus === "Overdue"
    );

    // Calculate unique customers
    const totalUsers = new Set(invoiceData.map((data) => data.clientEmail)).size;

    // Calculate total revenue
    const revenue = invoiceData.reduce(
        (acc, data) =>
            acc + (data.paymentStatus === "Paid" ? data.totalAmount : 0),
        0
    );

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 - Total Customers */}
            <Card>
                <CardHeader>
                    <CardTitle>Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        <p className="text-lg font-semibold">{totalUsers}</p>
                    )}
                </CardContent>
            </Card>

            {/* Card 2 - Total Revenue */}
            <Card>
                <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        <p className="text-lg font-semibold">
                            {revenue
                                ? formatCurrency({ amount: revenue })
                                : "N/A"}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Card 3 - Pending Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        <p className="text-lg font-semibold">
                            {pendingInvoices.length}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Card 4 - Overdue Invoices */}
            <Card>
                <CardHeader>
                    <CardTitle>Overdue Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : overdueInvoices.length < 1 ? (
                        <p className="text-sm text-gray-500">No Overdue</p>
                    ) : (
                        <p className="text-lg font-semibold">
                            {overdueInvoices.length}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StatCards;

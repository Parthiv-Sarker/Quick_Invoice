"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CheckCircle,
    DownloadCloudIcon,
    Mail,
    MoreHorizontal,
    Pencil,
    Trash,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import API from "@/config/axiosConfig";

const InvoiceAction = ({ invoiceId, currentStatus }) => {
    const onUpdatePaymentStatus = async () => {
        try {
            toast("Payment status updated successfully!");
        } catch (error) {
            toast("Failed to update payment status", {
                description: error.response?.data?.error,
            });
        }
    };

    const onDownloadPdf = async () => {
        try {
            toast("Payment status updated successfully!");
        } catch (error) {
            toast("Failed to update payment status", {
                description: error.response?.data?.error,
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                    <Link href={`/dashboard/invoice/edit?id=${invoiceId}`}>
                        <Pencil className="size-4 mr-2" />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                    <Link href={`/invoice/download-invoice/${invoiceId}`}>
                        <DownloadCloudIcon className="size-4 mr-2" />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                    <button>
                        <Mail className="size-4 mr-2" />
                        Reminder Email
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                    <button
                        className={`w-full px-4 py-2 text-sm ${
                            currentStatus === "Paid"
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-blue-500 hover:underline"
                        }`}
                        disabled={currentStatus === "Paid"}
                        onClick={onUpdatePaymentStatus}
                    >
                        <CheckCircle className="size-4 mr-2" />
                        Mark as Paid
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem
                    asChild
                    className="text-red-600 hover:cursor-pointer"
                >
                    <Link href={`/invoice/delete-invoice/${invoiceId}`}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default InvoiceAction;

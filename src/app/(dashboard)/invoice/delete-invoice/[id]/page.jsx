"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";

import { WarningGif } from "@/assets/index";

import { useDispatch } from "react-redux";
import { deleteInvoiceData } from "@/redux/slices/invoiceSlice";

import API from "@/config/axiosConfig";

const DeleteInvoice = ({ params }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            const { id } = params;
            setIsLoading(true);
            
            await API.delete(`/invoice/delete/${id}`);
            dispatch(deleteInvoiceData(id));
    
            toast.success("Invoice deleted successfully.");
            router.push("/invoice");
        } catch (error) {
            console.error("Error deleting invoice:", error);
            toast.error("Failed to delete invoice. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Delete Invoice</CardTitle>
                    <CardDescription>
                        Are you sure that you want to delete this invoice?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={WarningGif}
                        alt="Warning GIF"
                        className="rounded-xl"
                        width={500}
                        height={500}
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-center gap-6">
                    <Link
                        href="/invoice"
                        className={`h-10 w-32 hover:bg-gray-200 ${buttonVariants(
                            {
                                variant: "secondary",
                            }
                        )}`}
                    >
                        <h1 className="text-base font-bold">Cancel</h1>
                    </Link>
                    <Button
                        className="h-10 w-32 bg-red-500 text-base font-bold hover:bg-red-600 hover:cursor-pointer"
                        onClick={onDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DeleteInvoice;

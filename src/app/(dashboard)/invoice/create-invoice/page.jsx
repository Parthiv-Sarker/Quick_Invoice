"use client";
import React, { useState, useEffect } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { formatCurrency } from "@/lib/formatCurrency";

import { useDispatch,useSelector } from "react-redux";
import { addInvoiceData } from "@/redux/slices/invoiceSlice"

import API from "@/config/axiosConfig";

const formSchema = z.object({
    invoiceName: z
        .string()
        .min(2, { message: "Invoice Name must be at least 2 characters." }),
    invoiceNo: z
        .string()
        .min(1, { message: "Invoice No. must be at least 1 character." }),
    currency: z.string().min(1, { message: "Currency is required." }),
    client: z.object({
        name: z.string().min(2, { message: "Client name is required." }),
        email: z.string().email({ message: "Invalid email address." }),
        address: z
            .string()
            .min(5, { message: "Address must be at least 5 characters." }),
    }),
    date: z.date({ message: "Date is required." }),
    dueDate: z.string().min(1, { message: "Due date is required." }),
    quantity: z
        .string()
        .min(1, { message: "Quantity is required." })
        .transform((v) => Number(v) || 0),
    rate: z
        .string()
        .min(1, { message: "Rate is required." })
        .transform((v) => Number(v) || 0),
    totalAmount: z.number().default(0),
    note: z.string().default(""),
});

const CreateInvoice = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { status, userData } = useSelector((state) => state.auth); 

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoiceName: "",
            invoiceNo: "",
            currency: "",
            client: {
                name: "",
                email: "",
                address: "",
            },
            date: null,
            dueDate: "",
            quantity: 0,
            totalAmount: 0,
            rate: 0,
            note: "",
        },
    });

    // Watch quantity and rate changes
    const quantity = useWatch({ control: form.control, name: "quantity" });
    const rate = useWatch({ control: form.control, name: "rate" });

    // Calculate totalAmount when quantity or rate changes
    useEffect(() => {
        const total = quantity * rate;
        form.setValue("totalAmount", total, { shouldValidate: true });
    }, [quantity, rate, form.setValue]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await API.post("/invoice/create-invoice", data);
            dispatch(addInvoiceData(response.data.data))
            toast.success("Invoice created successfully.");
            form.reset();
        } catch (error) {
            console.log(error);
            toast.error("Failed to create invoice.", {
                description: error.response?.data?.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-extrabold">
                    Create Invoice
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Draft Badge and Invoice Name */}
                        <div className="flex gap-4 mb-6">
                            <Badge
                                variant="secondary"
                                className="h-9 w-20 flex justify-center items-center font-extrabold"
                            >
                                Draft
                            </Badge>
                            <FormField
                                control={form.control}
                                name="invoiceName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                placeholder="Invoice Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Invoice Number & Currency */}
                        <div className="md:flex md:gap-4">
                            <FormField
                                control={form.control}
                                name="invoiceNo"
                                render={({ field }) => (
                                    <FormItem className="mb-3 md:mb-0 w-1/2">
                                        <FormLabel>Invoice No.</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="h-9 w-10 flex justify-center items-center font-extrabold rounded-r-none"
                                                >
                                                    #
                                                </Badge>
                                                <Input
                                                    className="w-full rounded-l-none"
                                                    placeholder="5"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Currency</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Currency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="INR">
                                                        India -- INR
                                                    </SelectItem>
                                                    <SelectItem value="USD">
                                                        United States Dollar --
                                                        USD
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Sender & Customer */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* From Section (Non-editable) */}
                            <div className="space-y-2">
                                <FormLabel className="text-[1rem] font-extrabold">
                                    From
                                </FormLabel>
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-gray-200"
                                            value={userData?.name}
                                            disabled
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-gray-200"
                                            value={userData?.email}
                                            disabled
                                        />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-gray-200"
                                            value={userData?.address}
                                            disabled
                                        />
                                    </FormControl>
                                </FormItem>
                            </div>

                            {/* To Section (Editable) */}
                            <div className="space-y-2">
                                <FormLabel className="text-[1rem] font-extrabold">
                                    To
                                </FormLabel>
                                <FormField
                                    control={form.control}
                                    name="client.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full"
                                                    placeholder="Client Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="client.email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full"
                                                    placeholder="Client Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="client.address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full"
                                                    placeholder="Client Address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Invoice Date and Due date */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="md:w-full">
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="md:w-full">
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Due Date" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">
                                                        Due on Receipt
                                                    </SelectItem>
                                                    <SelectItem value="15">
                                                        Net 15
                                                    </SelectItem>
                                                    <SelectItem value="30">
                                                        Net 30
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Quantity and Rate */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="w-full"
                                                placeholder="0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Rate</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="w-full"
                                                placeholder="0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <FormField
                                control={form.control}
                                name="totalAmount"
                                render={({ field }) => (
                                    <FormItem className="flex justify-center items-center">
                                        <FormLabel className="text-lg font-extrabold">
                                            Total:
                                        </FormLabel>
                                        <FormControl>
                                            <div>
                                                <h1 className="font-extrabold">
                                                    {formatCurrency({
                                                        amount: form.watch(
                                                            "totalAmount"
                                                        ),
                                                        currency:
                                                            form.watch(
                                                                "currency"
                                                            ) || "INR",
                                                    })}
                                                </h1>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    disabled
                                                    className="hidden"
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Note:</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Textarea
                                                    className="w-full"
                                                    placeholder="Add additional details..."
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                className="w-28 bg-[#FF6F68] text-white hover:bg-[#fb645c] hover:text-white hover:shadow-md hover:cursor-pointer font-bold"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send Invoice"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateInvoice;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import API from "@/config/axiosConfig";

const formSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string(),
});

const Signin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await API.post("/auth/signin", data);
            toast.success("SignIn Successfull.");
            router.push("/");
        } catch (error) {
            console.log("Error signing in:", error);
            toast.error("Error signing in.", {
                description:
                    error?.response?.data?.error || "Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Card className="bg-transparent shadow-lg rounded-lg w-full max-w-md p-6">
            <CardHeader>
                <h1 className="text-xl font-bold md:text-3xl">Sign In</h1>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl className="relative">
                                        <div className="flex">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? (
                                                    <EyeIcon size={20} />
                                                ) : (
                                                    <EyeOffIcon size={20} />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full mt-4 hover:cursor-pointer"
                            disabled={isLoading}
                        >
                            Sign In
                            {isLoading && (
                                <Loader2
                                    className="animate-spin ml-2"
                                    size={20}
                                />
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default Signin;

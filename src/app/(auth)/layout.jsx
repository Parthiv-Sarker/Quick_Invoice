import React from "react";
import Image from "next/image";
import { invoiceLogo, BillPaymentIcon } from "@/assets/index.js";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <section className="hidden w-1/2 items-center justify-center bg-[#FF6F68] p-10 lg:flex xl:w-2/5">
                <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
                    <div className="flex items-center gap-3">
                        <Image
                            src={invoiceLogo}
                            alt="logo"
                            width={100}
                            height={100}
                            className="h-auto"
                        />
                        <div className="flex">
                            <span className="text-6xl font-extrabold text-black font-pacifico">
                                Quick
                            </span>
                            <span className="font-dancing-script text-3xl font-bold text-white">
                                Invoice
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6 mt-10 text-white">
                        <h2 className="text-4xl font-extrabold text-center">
                            Manage Your Invoices the Best Way
                        </h2>
                        <p className="text-lg">
                            Create, send, and track invoices with ease. Automate
                            billing, manage client payments, and keep financial
                            records organized—all in one powerful platform.
                        </p>
                    </div>
                    <Image
                        src={BillPaymentIcon}
                        alt="Files"
                        width={250}
                        height={250}
                        className="transition-all rounded-2xl hover:rotate-2 hover:scale-105"
                    />
                </div>
            </section>

            <section className="flex flex-1 flex-col justify-center items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mb-12 lg:hidden flex items-center gap-1">
                    <Image
                        src={invoiceLogo}
                        alt="logo"
                        width={100}
                        height={100}
                        className="h-auto w-[50px] lg:w-[250px]"
                    />
                    <h1 className="text-3xl font-extrabold">DriveX</h1>
                </div>

                {children}
            </section>
        </div>
    );
};

export default AuthLayout;

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import SidebarComponent from "@/components/myComponents/SidebarComponent";

import { navLinks } from "@/components/myComponents/NavLinks";

import API from "@/config/axiosConfig";

const DashboardLayout = ({ children }) => {
    const pathname = usePathname();

    const extractedPath = `/${pathname.split("/")[1]}`;
    const pagePathName = navLinks.find((item) => item.url === extractedPath);

    useEffect(() => {
        async function fetchData() {
            try {
                const invoiceResponse = await API.get("/invoice/get-invoices");
                const userResponse = await API.get("/auth/getuser");
            } catch (error) {
                console.log(error);
            } finally {
            }
        }
        fetchData();
    }, []);

    return (
        <main className="flex h-screen">
            <SidebarProvider>
                <SidebarComponent />
                <section className="flex flex-col flex-1 h-full p-2 gap-2">
                    <header className="bg-slate-100/60 h-20 flex items-center justify-between px-4 py-1 rounded-lg">
                        <div className="flex items-center gap-3 mr-3 md:mr-0 md:gap-10 md:w-40">
                            <SidebarTrigger />
                            <h1 className="md:text-3xl font-extrabold">
                                {pagePathName?.title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 md:gap-6">
                            Logout
                        </div>
                    </header>
                    <main className="bg-slate-100/60 remove-scrollbar h-full flex-1 overflow-auto bg-light-400 sm:rounded-[8px]">
                        <div className="px-2 py-2 md:mb-2 md:px-4 md:py-4">
                            {children}
                        </div>
                    </main>
                </section>
            </SidebarProvider>
        </main>
    );
};

export default DashboardLayout;

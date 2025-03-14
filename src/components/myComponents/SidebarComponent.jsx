"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";

import { navLinks } from "@/components/myComponents/NavLinks";
import { invoiceLogo } from "@/assets/index";

import { useSelector } from "react-redux";

const SidebarComponent = () => {
    const pathname = usePathname();
    const extractedPath = `/${pathname.split("/")[1]}`;

    const { status, userData } = useSelector((state) => state.auth);    

    return (
        <Sidebar>
            <div className="flex items-center gap-4 p-6">
                {/* <Image
                    src={invoiceLogo}
                    alt="logo"
                    width={500}
                    height={500}
                    className="w-16 h-16"
                /> */}
                <div className="flex gap-1 p-2">
                    <span className="text-5xl font-extrabold font-dancing-script text-[#96CDB4]">
                        Quick
                    </span>
                    <span className="font-pacifico text-2xl font-bold text-[#FF6F68]">
                        Invoice
                    </span>
                </div>
            </div>
            <SidebarContent className="mt-6 p-1">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navLinks.map((item) => {
                                const isActive = extractedPath === item.url;
                                return (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className={`p-2 mb-2 rounded-full ${
                                            isActive
                                                ? "bg-[#FF6F68] font-semibold"
                                                : "bg-gray-100 text-gray-900"
                                        }`}
                                    >
                                        <SidebarMenuButton
                                            asChild
                                            className="hover:bg-inherit"
                                        >
                                            <Link href={item.url}>
                                                <div className="flex items-center space-x-2">
                                                    <Image
                                                        src={item.icon}
                                                        alt="icons"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <span className="text-base">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-6">
                {userData?.name}
            </SidebarFooter>
        </Sidebar>
    );
};

export default SidebarComponent;

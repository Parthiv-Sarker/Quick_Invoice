"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

import API from "@/config/axiosConfig";

const LogoutButton = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onLogout = async () => {
        try {
            setIsLoading(true);
            await API.post("/auth/logout");
            toast("Successfully Logged Out.");
            router.push("/signin");
        } catch (error) {
            console.log(error);
            toast("Failed to Logout.", {
                description: "Please try again later",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Button
            className="bg-[#FF6F68] text-white hover:bg-[#fb645c] hover:text-white hover:shadow-md hover:cursor-pointer font-bold"
            onClick={onLogout}
            disabled={isLoading}
        >
            Logout <LogOut size={24} />
        </Button>
    );
};

export default LogoutButton;

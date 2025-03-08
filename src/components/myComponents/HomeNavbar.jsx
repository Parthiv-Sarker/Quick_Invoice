import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../ui/button";

// import { invoiceLogo } from "@/assets/index";

const HomeNavbar = () => {
    const authStatus = false;
    return (
        <nav className="fixed z-50 w-screen h-20 flex justify-between items-center px-8 bg-white shadow-md">
            <Link
                href="/"
                className="flex justify-center items-center gap-3 md:ml-4"
            >
                {/* <Image
                    className="h-7 w-7 md:h-12 md:w-12"
                    src={invoiceLogo}
                    height={48}
                    width={48}
                    alt="Invoice Logo"
                /> */}
                <h1 className="text-lg font-extrabold">
                    <span className="text-[#96CDB4] text-xl md:text-3xl">
                        Easy
                    </span>
                    <span className="text-[#FF6F68]"> Invoice</span>
                </h1>
            </Link>

            <div className="flex gap-2 md:space-x-4">
                {!authStatus ? (
                    <>
                        <Link href="/signin">
                            <Button className="text-sm h-8 md:px-8 md:py-4 md:text-lg font-bold text-white bg-[#FF6F68] rounded-lg hover:bg-[#fc5e56] hover:cursor-pointer">
                                Login
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="text-sm h-8 md:px-8 md:py-4 md:text-lg font-bold text-white bg-[#FF6F68] rounded-lg hover:bg-[#fc5e56] hover:cursor-pointer">
                                Signup
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Link href="/dashboard">
                        <Button className="text-[10px] md:w-40 md:px-10 md:py-4 md:text-lg font-bold text-white bg-[#FF6F68] rounded-lg hover:bg-[#fc5e56] hover:cursor-pointer">
                            Go to Dashboard
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default HomeNavbar;

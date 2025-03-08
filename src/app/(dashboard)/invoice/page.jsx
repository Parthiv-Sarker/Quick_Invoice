import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import InvoiceList from "@/components/myComponents/InvoiceList";

const Invoice = () => {
    return (
        <div>
            <Button className="bg-[#FF6F68] text-white hover:bg-[#fb645c] hover:text-white hover:shadow-md hover:cursor-pointer font-bold ml-4">
                <Link
                    href="/invoice/create-invoice"
                    className="flex items-center justify-center gap-2"
                >
                    <h1 className="font-extrabold">Create Invoice</h1>
                    <Plus size={24} />
                </Link>
            </Button>
            <InvoiceList />
        </div>
    );
};

export default Invoice;

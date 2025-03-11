import React from "react";

import StatCards from "@/components/myComponents/StatCards";
import GraphComponent from "@/components/myComponents/GraphComponent";
import PaidInvoiceList from "@/components/myComponents/PaidInvoiceList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
    return (
        <div>
            <StatCards />
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 py-4">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Total Invoice Amount Over Time</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2 md:px-8">
                        <GraphComponent />
                    </CardContent>
                </Card>
                <PaidInvoiceList />
            </div>
        </div>
    );
};

export default Dashboard;

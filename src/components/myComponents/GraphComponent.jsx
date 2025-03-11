"use client";
import React, { useState, useEffect } from "react";
import {
    Line,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    LineChart,
    ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { useSelector } from "react-redux";

const GraphComponent = () => {
    const [chartData, setChartData] = useState([]);
    const { isLoading, invoiceData } = useSelector((state) => state.invoice);

    useEffect(() => {
        // Format data for Recharts
        const formattedData = invoiceData.map((invoice) => ({
            date: new Date(invoice.date).toLocaleDateString(),
            totalAmount: invoice.totalAmount,
        }));

        setChartData(formattedData);
    }, [invoiceData]);

    return (
        <ChartContainer
            config={{
                amount: {
                    label: "Amount",
                    color: "bg-green-500",
                },
            }}
            className="min-h-[100px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#FF6F68"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default GraphComponent;

import React from "react";

import StatCards from "@/components/myComponents/StatCards";

const Dashboard = () => {
    return (
        <div>
            <StatCards/>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 py-4">
                Dashboard
            </div>
        </div>
    );
};

export default Dashboard;

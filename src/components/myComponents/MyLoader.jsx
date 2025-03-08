import { Loader } from "lucide-react";
import { invoiceLogo } from "@/assets/index";

const MyLoader = ({ size = "w-7 h-7", speed = "3s", logo = false }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Loader
                className={`${size} animate-spin text-[#FF6F68]`}
                style={{ animationDuration: speed }}
            />
            {logo && (
                <div className="flex items-center gap-5 mt-4">
                    <img
                        className="h-7 w-7 md:h-8 md:w-8"
                        src={invoiceLogo}
                        alt="Invoice Logo"
                    />
                    <h1 className="text-lg font-extrabold">
                        <span className="text-[#96CDB4] text-xl md:text-3xl">
                            Quick
                        </span>
                        <span className="text-[#FF6F68]"> Invoice</span>
                    </h1>
                </div>
            )}
        </div>
    );
};

export default MyLoader;

"use client";
import Link from "next/link";
import HomeNavbar from "@/components/myComponents/HomeNavbar";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <HomeNavbar />

            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-md">
                    Streamline Your Invoicing
                </h1>
                <p className="mt-4 md:text-lg text-gray-700">
                    Empower your business with fast, reliable, and secure
                    invoice management.
                </p>
                <button
                    className="px-4 py-2 md:px-6 md:py-3 mt-6 text-lg font-bold text-white bg-[#FF6F68] rounded-lg hover:bg-[#fc5e56] hover:cursor-pointer"
                    onClick={() => alert("Explore Features")}
                >
                    Explore Features
                </button>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Why Choose Us?
                    </h2>
                    <div className="grid gap-8 p-4 md:p-0 sm:grid-cols-1 md:grid-cols-3">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Fast Invoice Creation
                            </h3>
                            <p className="text-gray-600">
                                Create invoices in seconds and send them
                                directly to your clients.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Track Payments
                            </h3>
                            <p className="text-gray-600">
                                Keep tabs on payments with real-time updates and
                                notifications.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Secure & Reliable
                            </h3>
                            <p className="text-gray-600">
                                Your data is protected with industry-standard
                                security measures.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        What Our Clients Say
                    </h2>
                    <div className="grid gap-8 p-4 md:p-0 sm:grid-cols-1 md:grid-cols-2">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="text-gray-600">
                                “Since switching to this platform, our invoicing
                                process has become smooth and hassle-free.
                                Highly recommend!”
                            </p>
                            <p className="mt-4 font-bold text-gray-900">
                                - Sarah K., Business Owner
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <p className="text-gray-600">
                                “This tool saves me hours every week. Managing
                                invoices and tracking payments has never been
                                easier!”
                            </p>
                            <p className="mt-4 font-bold text-gray-900">
                                - John D., Freelancer
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Get Started Today
                    </h2>
                    <p className="text-gray-700 mb-10">
                        Join thousands of businesses simplifying their invoicing
                        process with our platform.
                    </p>
                    <Link
                        className="px-4 py-3 text-sm md:px-8 md:py-4 md:text-lg font-bold text-white bg-[#FF6F68] rounded-lg hover:bg-[#fc5e56] hover:cursor-pointer"
                        href="/signup"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-100 text-center">
                <p className="text-gray-500">
                    &copy; {new Date().getFullYear()} QuickInvoice. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}

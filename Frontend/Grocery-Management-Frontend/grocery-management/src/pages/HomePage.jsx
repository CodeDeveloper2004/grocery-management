import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const HomePage = () => {
    return (
        <main className="bg-gray-50">
            <Header />
            {/* HERO SECTION */}
            <section className="min-h-[90vh] flex items-center justify-center px-6">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="text-green-600 font-semibold mb-3">
                            Smart Grocery Management
                        </p>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
                            Manage Your Grocery Store
                            <span className="text-green-600"> Smarter</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Track inventory, manage sales, monitor payments,
                            and analyze business performance in one modern platform.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition">
                                Get Started
                            </button>

                            <button className="border border-gray-300 hover:border-green-600 hover:text-green-600 px-8 py-3 rounded-xl font-medium transition">
                                Learn More
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="flex gap-10 mt-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">500+</h2>
                                <p className="text-gray-500">Products Managed</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">24/7</h2>
                                <p className="text-gray-500">Inventory Tracking</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">99%</h2>
                                <p className="text-gray-500">Sales Accuracy</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="relative">

                        {/* MAIN CARD */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8">

                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Store Analytics
                                </h2>

                                <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                                    Live Data
                                </div>
                            </div>

                            {/* ANALYTICS CARDS */}
                            <div className="grid grid-cols-2 gap-5">

                                <div className="bg-green-50 rounded-2xl p-5">
                                    <p className="text-gray-500 mb-2">Today's Sales</p>
                                    <h3 className="text-3xl font-bold text-green-600">
                                        ₹12,450
                                    </h3>
                                </div>

                                <div className="bg-blue-50 rounded-2xl p-5">
                                    <p className="text-gray-500 mb-2">Products</p>
                                    <h3 className="text-3xl font-bold text-blue-600">
                                        1,240
                                    </h3>
                                </div>

                                <div className="bg-orange-50 rounded-2xl p-5">
                                    <p className="text-gray-500 mb-2">Low Stock</p>
                                    <h3 className="text-3xl font-bold text-orange-600">
                                        18
                                    </h3>
                                </div>

                                <div className="bg-purple-50 rounded-2xl p-5">
                                    <p className="text-gray-500 mb-2">Orders</p>
                                    <h3 className="text-3xl font-bold text-purple-600">
                                        320
                                    </h3>
                                </div>

                            </div>

                            {/* CHART PLACEHOLDER */}
                            <div className="mt-8 bg-gray-100 rounded-2xl h-52 flex items-center justify-center">
                                <p className="text-gray-400 text-lg">
                                    Sales Analytics Chart
                                </p>
                            </div>

                        </div>

                        {/* FLOATING CARD */}
                        <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl px-6 py-4 hidden md:block">
                            <p className="text-gray-500 text-sm">Monthly Growth</p>
                            <h3 className="text-2xl font-bold text-green-600">
                                +28%
                            </h3>
                        </div>

                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <p className="text-green-600 font-semibold mb-3">
                            FEATURES
                        </p>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Everything You Need
                        </h2>

                        <p className="text-gray-600 text-lg">
                            Powerful tools to manage your grocery business efficiently
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-gray-50 hover:shadow-xl transition rounded-3xl p-8">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                📦
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                Inventory Management
                            </h3>

                            <p className="text-gray-600">
                                Manage stock levels, product updates, and low stock alerts.
                            </p>
                        </div>

                        <div className="bg-gray-50 hover:shadow-xl transition rounded-3xl p-8">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                💳
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                Payment Tracking
                            </h3>

                            <p className="text-gray-600">
                                Track online and offline payments with smart analytics.
                            </p>
                        </div>

                        <div className="bg-gray-50 hover:shadow-xl transition rounded-3xl p-8">
                            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                                📊
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                Sales Analytics
                            </h3>

                            <p className="text-gray-600">
                                Analyze sales performance with reports and insights.
                            </p>
                        </div>

                        <div className="bg-gray-50 hover:shadow-xl transition rounded-3xl p-8">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                👥
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                Staff Management
                            </h3>

                            <p className="text-gray-600">
                                Manage staff access and role-based permissions securely.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default HomePage;
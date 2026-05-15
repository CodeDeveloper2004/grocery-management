import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Grocery<span className="text-green-500">System</span>
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Smart grocery management solution for inventory,
            billing, analytics, and seamless store operations.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <Link
                to="/"
                className="hover:text-green-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="hover:text-green-400 transition"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="hover:text-green-400 transition"
              >
                Register
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="hover:text-green-400 transition"
              >
                Dashboard
              </Link>
            </li>

          </ul>
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Features
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Inventory Management</li>
            <li>Sales Analytics</li>
            <li>Payment Tracking</li>
            <li>Staff Management</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">
            <p>📧 support@grocery.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Pune, Maharashtra</p>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm px-6">
        © 2026 Grocery Management System. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
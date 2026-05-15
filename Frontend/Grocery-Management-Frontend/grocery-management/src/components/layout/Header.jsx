import { Link } from "react-router-dom";

const Header = () => {
  return (
   <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LOGO */}
    <div>
      <h2 className="text-2xl font-bold tracking-wide">
        Grocery<span className="text-green-500">System</span>
      </h2>
    </div>

    {/* NAVIGATION */}
    <nav className="flex items-center gap-6">

      <Link
        to="/"
        className="hover:text-green-400 transition duration-200 font-medium"
      >
        Home
      </Link>

      <Link
        to="/login"
        className="hover:text-green-400 transition duration-200 font-medium"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl transition duration-200 font-medium"
      >
        Register
      </Link>

    </nav>
  </div>
</header>
  );
};

export default Header;
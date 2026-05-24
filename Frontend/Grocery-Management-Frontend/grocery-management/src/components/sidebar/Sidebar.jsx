import { useState ,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/authService";

import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle2,
} from "lucide-react";

function Sidebar({
  collapsed,
  setCollapsed,
}) {

  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);
  const [profile, setProfile] =
    useState(null);

useEffect(() => {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (!token) {
    return;
  }

  const fetchProfile = async () => {

    try {

      const response =
        await getProfile();

      setProfile(response);

    } catch (error) {

      console.error(
        "Profile fetch failed",
        error
      );

    }
  };

  fetchProfile();

}, []);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <Boxes size={20} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Boxes size={20} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={20} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = () => {

    localStorage.removeItem("token");

    sessionStorage.removeItem("token");

    navigate("/login");

  };

  return (
    <div
      className={`
        h-screen bg-green-900 text-white
        fixed top-0 left-0
        transition-all duration-300
        flex flex-col justify-between
        ${collapsed ? "w-20" : "w-64"}
      `}
    >

      {/* TOP SECTION */}
      <div>

        {/* HEADER */}
        <div className="
          flex items-center justify-between
          p-4 border-b border-green-700
        ">

          {!collapsed && (
            <h1 className="text-xl font-bold">
              Grocery Admin
            </h1>
          )}

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              p-1 rounded
              hover:bg-green-800
            "
          >

            {collapsed
              ? <ChevronRight size={20} />
              : <ChevronLeft size={20} />
            }

          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 p-3">

          {menuItems.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex items-center gap-3
                  p-3 rounded-xl
                  transition-all duration-200

                  ${isActive
                    ? "bg-green-700"
                    : "hover:bg-green-800"
                  }
                `
              }
            >

              {item.icon}

              {!collapsed && (
                <span>{item.name}</span>
              )}

            </NavLink>

          ))}

        </nav>
      </div>

      {/* PROFILE SECTION */}
      <div className="
        p-3 border-t border-green-700
        relative
      ">

        {/* PROFILE BUTTON */}
        <button
          onClick={() =>
            setShowProfileMenu(!showProfileMenu)
          }
          className="
            w-full flex items-center gap-3
            p-3 rounded-xl
            hover:bg-green-800
            transition-all duration-200
          "
        >

          {/* AVATAR */}
          <div className="
            w-10 h-10 rounded-full
            bg-lime-400 text-green-900
            flex items-center justify-center
            font-bold
          ">
            S
          </div>

          {!collapsed && (

            <div className="text-left">

              <h3 className="font-semibold">
                {profile?.name}
              </h3>

              <p className="
                text-sm text-green-200
              ">
                {profile?.role}
              </p>

            </div>

          )}

        </button>

        {/* DROPDOWN */}
        {showProfileMenu && !collapsed && (

          <div className="
            absolute bottom-24 left-3 right-3
            bg-white text-gray-800
            rounded-2xl shadow-2xl
            overflow-hidden
          ">

            <button
              className="
                w-full flex items-center gap-3
                p-4 hover:bg-gray-100
              "
            >

              <UserCircle2 size={18} />

              Profile

            </button>

            <button
              onClick={handleLogout}
              className="
                w-full flex items-center gap-3
                p-4 hover:bg-red-50
                text-red-600
              "
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        )}

      </div>
    </div>
  );
}

export default Sidebar;
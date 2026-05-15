import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar({ collapsed, setCollapsed }) {

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
      icon: <Users size={20} />,
    },
  ];

  return (
    <div
      className={`
        h-screen bg-green-900 text-white fixed top-0 left-0
        transition-all duration-300
        ${collapsed ? "w-17" : "w-64"}
      `}
    >

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-green-700">

        {!collapsed && (
          <h1 className="text-xl font-bold">
            Grocery Admin
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-green-800"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
                flex items-center gap-3 p-3 rounded-lg
                transition-all duration-200
                ${
                  isActive
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
  );
}

export default Sidebar;
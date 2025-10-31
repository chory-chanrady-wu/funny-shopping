"use client";

import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", text: "Products" },
    { to: "/services", text: "Services" },
    { to: "/contact", text: "Contact" },
    { to: "/about", text: "About" },
  ];

  const activeLinkStyle = {
    color: "#60a5fa", // Tailwind's blue-400
    fontWeight: "bold",
  };

  return (
    <nav className="fixed top-0 w-full h-16 bg-blue-900 text-white font-bold shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-400"
          >
            <img
              src="https://img.icons8.com/?size=100&id=1uTIu2nEDNbA&format=png&color=000000"
              alt="logo"
              className="h-10 w-10"
            />
            <span>Funny Shopping</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                  className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side icons and buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="hover:text-blue-400 transition-colors relative p-1"
                >
                  <ShoppingCart size={22} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-blue-400"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-gray-600" />
                    )}
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 ring-1 ring-black ring-opacity-5">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-bold truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                {link.text}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              {isAuthenticated && (
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="relative p-1 rounded-full hover:text-white"
                >
                  <ShoppingCart size={22} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
            </div>
            <div className="mt-3 px-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <span
                    className="block px-3 py-2 text-base font-medium"
                    title={user.email}
                  >
                    Welcome, {user.displayName || user.email}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full h-16 bg-blue-900 text-white font-bold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-blue-400">Funny Shopping</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex justify-center m-1 items-center gap-8">
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Products
              </Link>
              <Link
                to="/services"
                className="hover:text-blue-400 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </Link>

              <Link
                to="/cart"
                className="hover:text-blue-400 transition-colors relative"
              >
                <ShoppingCart size={22} />
                {/* Optional: Badge for cart count */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  3
                </span>
              </Link>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
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
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Product
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              About
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 translate-x-1 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="hover:text-blue-400 translate-x-1 transition-colors relative"
            >
              <ShoppingCart size={22} />
              {/* Optional: Badge for cart count */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                3
              </span>
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;

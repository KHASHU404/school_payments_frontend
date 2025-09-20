// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth"; 
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const { token, logout } = useAuth ? useAuth() : { token: null, logout: () => {} };
  const nav = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold">
                SP
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">SchoolPay</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Payments & Dashboard</div>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline">
                Transactions
              </Link>
              <Link to="/create-payment" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline">
                Create Payment
              </Link>
              <Link to="/status-check" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline">
                Check Status
              </Link>
            </nav>
          </div>

          {/* Right: Theme Toggle + Auth */}
          <div className="flex items-center gap-3">
            {/* Theme Button */}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg border text-sm font-medium
                        bg-gray-100 text-gray-900 hover:bg-gray-200
                        dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600
                        transition"
            >
              {theme === "light" ? "🌞 Light" : "🌙 Dark"}
            </button>

            {/* Auth Buttons */}
            {token ? (
              <button
                onClick={() => { logout(); nav("/login"); }}
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 
                           bg-white hover:bg-gray-50 text-gray-700
                           dark:bg-gray-800 dark:border-gray-600 
                           dark:text-gray-200 dark:hover:bg-gray-700 
                           transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 
                           bg-white hover:bg-gray-50 text-gray-700
                           dark:bg-gray-800 dark:border-gray-600 
                           dark:text-gray-200 dark:hover:bg-gray-700 
                           transition"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

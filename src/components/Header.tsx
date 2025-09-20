// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth'; // keep if you have this hook

export default function Header() {
  const { token, logout } = useAuth ? useAuth() : { token: null, logout: () => {} };
  const nav = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold">SP</div>
              <div>
                <div className="font-semibold">SchoolPay</div>
                <div className="text-xs text-gray-500">Payments & Dashboard</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 ml-6">
              <Link to="/" className="text-sm hover:underline">Transactions</Link>
              <Link to="/create-payment" className="text-sm hover:underline">Create Payment</Link>
              <Link to="/status-check" className="text-sm hover:underline">Check Status</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // simple theme toggle placeholder — implement your preferred theme switcher
                document.documentElement.classList.toggle('dark');
              }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              🌗
            </button>

            {token ? (
              <>
                <button
                  onClick={() => { logout(); nav('/login'); }}
                  className="text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">Sign in</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

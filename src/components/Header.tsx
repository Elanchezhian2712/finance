import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Wallet, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-slate-100 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-slate-200 rounded-full p-3 mr-4 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
            <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
              Finance Tracker
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Track my income and expenses
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-200 rounded-lg px-3 py-2 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
            <User className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-600 truncate max-w-32">
              {user?.email}
            </span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-200 rounded-lg shadow-[2px_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_4px_rgba(0,0,0,0.2)] transition-all duration-200 hover:bg-slate-300"
          >
            <LogOut className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-600 hidden sm:inline">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
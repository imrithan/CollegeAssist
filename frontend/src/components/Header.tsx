import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onNavigate: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 flex items-center justify-end px-8 relative">
      <div className="relative">
        <button
          id="user-avatar-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors shadow-sm focus:outline-none"
          title={user?.full_name || 'User Account'}
        >
          <User className="w-5 h-5" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800">{user?.full_name || 'Rithan V'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'rithan@example.com'}</p>
            </div>
            <button
              onClick={() => {
                setDropdownOpen(false);
                onNavigate('profile');
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => {
                setDropdownOpen(false);
                logout();
                onNavigate('login');
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-slate-100 mt-1"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

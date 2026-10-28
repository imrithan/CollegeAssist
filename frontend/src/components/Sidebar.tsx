import React from 'react';
import {
  Home,
  User,
  GraduationCap,
  MessageSquare,
  BookmarkCheck,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const { logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'recommendations', label: 'Get Recommendations', icon: GraduationCap },
    { id: 'chat', label: 'Chat with AI', icon: MessageSquare },
    { id: 'history', label: 'Counseling History', icon: BookmarkCheck },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      onNavigate('login');
    }
  };

  return (
    <aside className="w-64 bg-[#0F243A] text-white flex flex-col min-h-screen select-none shrink-0 border-r border-[#162F4A]">
      {/* Top Logo */}
      <div className="p-6 flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
        <GraduationCap className="w-8 h-8 text-white" />
        <span className="text-xl font-bold tracking-tight text-white">CollegeAssist</span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 space-y-1.5 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-[14.5px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          id="nav-logout"
          onClick={handleLogout}
          className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-[14.5px] font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-150 mt-4"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Bottom subtle indicator */}
      <div className="p-4 text-xs text-slate-500 text-center">
        v1.0 • CollegeAssist AI
      </div>
    </aside>
  );
};

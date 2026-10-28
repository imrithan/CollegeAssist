import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentTab, onNavigate, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F0F5FA]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar currentTab={currentTab} onNavigate={onNavigate} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 bg-[#0F243A]">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar
              currentTab={currentTab}
              onNavigate={(tab) => {
                onNavigate(tab);
                setMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Mobile Header Bar + Desktop Header */}
        <div className="flex items-center justify-between md:justify-end px-4 md:px-8 py-2 md:py-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Header onNavigate={onNavigate} />
        </div>

        {/* Content Body */}
        <main className="flex-1 px-4 md:px-10 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

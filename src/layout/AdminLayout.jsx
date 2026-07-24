import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Slider from './../shared/Slider';

function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fffaf0] text-[#3f2b1a] relative">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block w-72 shrink-0">
        <Slider />
      </div>

      {/* Mobile Drawer Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col animate-slideRight">
            <Slider onClose={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Navbar Header */}
        <header className="lg:hidden flex items-center justify-between bg-white border-b border-[#f3e6d3] px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-xl hover:bg-[#f7e1c4] text-[#3f2b1a] transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
            <span className="text-[#3f2b1a] font-black text-xl">Jawla Admin</span>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
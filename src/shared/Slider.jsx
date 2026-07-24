import { Home, Compass, MapPin, CalendarDays, LogOut, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

function Slider({ onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClose) onClose();
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Overview', icon: Home, end: true },
    { to: '/admin/dashboard/guides', label: 'Tour guides', icon: Compass },
    { to: '/admin/dashboard/tourists', label: 'Tourists', icon: MapPin },
    { to: '/admin/dashboard/bookings', label: 'Bookings', icon: CalendarDays },
  ];

  return (
    <aside className="flex h-full w-full flex-col border-r border-[#f3e6d3] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-8">
        <div>
          <h2 className="text-[#3f2b1a] font-black text-2xl leading-tight">Admin Panel</h2>
          <p className="mt-2 text-sm text-[#695744] leading-relaxed">
            Manage your tours, guides, and tourists with ease.
          </p>
        </div>
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-[#f7e1c4] text-[#3f2b1a] transition cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-6 pb-4">
        <div className="h-1 w-20 rounded-full bg-[#b57a2d]" />
      </div>

      {/* Navigation */}
      <nav className="px-3 pb-6 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full rounded-3xl px-4 py-3 text-left font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#f7e1c4] text-[#3f2b1a] shadow-xs'
                    : 'text-[#695744] hover:bg-[#fff7ea] hover:text-[#3f2b1a]'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto px-6 pb-8">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b57a2d] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Slider;
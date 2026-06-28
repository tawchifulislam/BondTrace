import React, { useState } from 'react';
import Logo from './Logo';
import { NavLink } from 'react-router';
import { FaHome } from 'react-icons/fa';
import { CiViewTimeline } from 'react-icons/ci';
import { IoIosStats } from 'react-icons/io';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/timeline', label: 'Timeline', icon: CiViewTimeline },
  { to: '/stats', label: 'Stats', icon: IoIosStats },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/70 rounded-full p-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#244D3F] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#244D3F]'
                  }`
                }
              >
                <Icon size={15} /> {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <button className="hidden md:flex items-center gap-2 bg-[#244D3F] hover:bg-[#1b3a2f] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
            <FaPlus size={12} /> Add Friend
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#244D3F] text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-1 bg-white border-t border-gray-100">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#244D3F] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
          <button className="mt-2 flex items-center justify-center gap-2 bg-[#244D3F] text-white text-sm font-medium px-4 py-3 rounded-lg">
            <FaPlus size={12} /> Add Friend
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

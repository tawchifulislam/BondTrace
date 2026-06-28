import React, { useState } from 'react';
import Logo from './Logo';
import AddFriendModal from './AddFriendModal';
import { openAddFriendModal } from '../utils/modalControls';
import { NavLink } from 'react-router';
import { FaHome, FaPlus } from 'react-icons/fa';
import { CiViewTimeline } from 'react-icons/ci';
import { IoIosStats } from 'react-icons/io';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { to: '/', label: 'Home', Icon: FaHome },
  { to: '/timeline', label: 'Timeline', Icon: CiViewTimeline },
  { to: '/stats', label: 'Stats', Icon: IoIosStats },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleAddFriendClick = () => {
    setOpen(false);
    openAddFriendModal();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Logo />

          <div className="hidden md:flex items-center gap-1 bg-gray-100/70 rounded-full p-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#244D3F] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#244D3F]'
                  }`
                }
              >
                <item.Icon size={15} /> {item.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={handleAddFriendClick}
            className="hidden md:flex items-center gap-2 bg-[#244D3F] hover:bg-[#1b3a2f] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <FaPlus size={12} /> Add Friend
          </button>

          <button
            className="md:hidden text-[#244D3F] text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-1 bg-white border-t border-gray-100">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#244D3F] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.Icon size={16} /> {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleAddFriendClick}
            className="mt-2 flex items-center justify-center gap-2 bg-[#244D3F] text-white text-sm font-medium px-4 py-3 rounded-lg"
          >
            <FaPlus size={12} /> Add Friend
          </button>
        </div>
      </div>
      <AddFriendModal />
    </nav>
  );
};

export default Navbar;

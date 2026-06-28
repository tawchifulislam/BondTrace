import React, { useState } from 'react';
import { IoIosCall, IoMdText } from 'react-icons/io';
import { CiVideoOn } from 'react-icons/ci';
import { HiOutlineSearch, HiOutlineClock } from 'react-icons/hi';

const typeMeta = {
  Call: { icon: IoIosCall, color: 'bg-[#244D3F] text-white' },
  Text: { icon: IoMdText, color: 'bg-[#7E35E1] text-white' },
  Video: { icon: CiVideoOn, color: 'bg-[#37A163] text-white' },
};

const Timeline = () => {
  const [entries] = useState(() => {
    return JSON.parse(localStorage.getItem('timeline') || '[]');
  });
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest First');

  const filteredEntries = entries
    .filter(e => (filter ? e.type === filter : true))
    .filter(e => e.friend.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'Newest First'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date),
    );

  const filterTabs = ['', 'Call', 'Text', 'Video'];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-full bg-[#244D3F]/10 text-[#244D3F] flex items-center justify-center text-xl">
            <HiOutlineClock />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Timeline
          </h1>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          Every call, text, and video moment - all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-1 bg-gray-100/70 rounded-full p-1 w-fit overflow-x-auto">
            {filterTabs.map(tab => (
              <button
                key={tab || 'all'}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === tab
                    ? 'bg-[#244D3F] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#244D3F]'
                }`}
              >
                {tab || 'All'}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search by friend"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-200 bg-white rounded-full pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#244D3F]/20 w-full sm:w-56"
              />
            </div>

            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="border border-gray-200 bg-white rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#244D3F]/20"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
            <p className="text-sm text-gray-400">No interactions yet.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200 hidden sm:block" />
            <div className="space-y-4">
              {filteredEntries.map((entry, idx) => {
                const meta = typeMeta[entry.type] || typeMeta.Call;
                const Icon = meta.icon;
                return (
                  <div
                    key={idx}
                    className="relative flex items-start sm:items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow sm:ml-12"
                  >
                    <span
                      className={`absolute -left-12 top-1/2 -translate-y-1/2 hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-sm ring-4 ring-[#f8fafc] ${meta.color}`}
                    >
                      <Icon />
                    </span>
                    <span
                      className={`flex sm:hidden w-9 h-9 rounded-full items-center justify-center text-base shrink-0 ${meta.color}`}
                    >
                      <Icon />
                    </span>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {entry.type} with {entry.friend}
                      </p>
                      <span className="text-xs text-gray-400">
                        {entry.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;

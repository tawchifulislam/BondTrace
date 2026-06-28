import React, { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold mb-6 text-black">Timeline</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-black"
          >
            <option value="">Filter Timeline</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>

          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-black"
          />

          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-black"
          >
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        <div className="bg-white border rounded p-4 shadow">
          {filteredEntries.length === 0 ? (
            <p className="text-sm text-black text-center">
              No interactions yet.
            </p>
          ) : (
            <ul className="divide-y">
              {filteredEntries.map((entry, idx) => (
                <li
                  key={idx}
                  className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"
                >
                  <span className="text-sm font-medium text-black">
                    {entry.type} with {entry.friend}
                  </span>
                  <span className="text-xs text-black">{entry.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

import React, { useEffect, useState } from 'react';
import Friends from '../components/Friends';
import {
  HiUsers,
  HiCheckCircle,
  HiExclamationCircle,
  HiChatAlt2,
} from 'react-icons/hi';

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [interactionCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = JSON.parse(localStorage.getItem('timeline') || '[]');
    const now = new Date();
    return saved.filter(e => {
      const d = new Date(e.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;
  });

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => setFriends(data));
  }, []);

  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(
    f => f.status === 'overdue' || f.status === 'almost due',
  ).length;

  const stats = [
    {
      label: 'Total Friends',
      value: friends.length,
      icon: HiUsers,
      color: 'text-[#244D3F] bg-[#244D3F]/10',
    },
    {
      label: 'On Track',
      value: onTrack,
      icon: HiCheckCircle,
      color: 'text-[#37A163] bg-[#37A163]/10',
    },
    {
      label: 'Need Attention',
      value: needAttention,
      icon: HiExclamationCircle,
      color: 'text-[#EF4444] bg-[#EF4444]/10',
    },
    {
      label: 'Interactions This Month',
      value: interactionCount,
      icon: HiChatAlt2,
      color: 'text-[#7E35E1] bg-[#7E35E1]/10',
    },
  ];

  return (
    <section className="bg-[#f8fafc] min-h-screen">
      <div className="bg-linear-to-b from-white to-[#f8fafc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#37A163] bg-[#37A163]/10 px-3 py-1 rounded-full mb-4">
            Stay Connected
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 max-w-2xl mx-auto">
            Friends to keep close in your life
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: StatIcon, color }) => (
            <div
              key={label}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow"
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${color}`}
              >
                <StatIcon />
              </span>
              <h2 className="font-bold text-xl sm:text-2xl text-gray-900">
                {value}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <Friends />
    </section>
  );
};

export default Home;

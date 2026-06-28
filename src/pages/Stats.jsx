import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IoIosCall, IoMdText } from 'react-icons/io';
import { CiVideoOn } from 'react-icons/ci';
import { HiOutlineChartPie } from 'react-icons/hi';

const Stats = () => {
  const [data] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('timeline') || '[]');

    const counts = {
      Call: saved.filter(e => e.type === 'Call').length,
      Text: saved.filter(e => e.type === 'Text').length,
      Video: saved.filter(e => e.type === 'Video').length,
    };

    return [
      { name: 'Call', value: counts.Call },
      { name: 'Text', value: counts.Text },
      { name: 'Video', value: counts.Video },
    ];
  });

  const COLORS = { Call: '#244D3F', Text: '#7E35E1', Video: '#37A163' };
  const icons = { Call: IoIosCall, Text: IoMdText, Video: CiVideoOn };
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-full bg-[#244D3F]/10 text-[#244D3F] flex items-center justify-center text-xl">
            <HiOutlineChartPie />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Friendship Analytics
          </h1>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          See how your attention is spread across calls, texts, and videos.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {data.map(({ name, value }) => {
            const Icon = icons[name];
            const percent = total ? Math.round((value / total) * 100) : 0;
            return (
              <div
                key={name}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3"
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-white"
                  style={{ backgroundColor: COLORS[name] }}
                >
                  <Icon />
                </span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{name} Interactions</p>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: COLORS[name],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-700">
              By Interaction Type
            </h2>
            <span className="text-xs text-gray-400">{total} total</span>
          </div>

          {total === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-400">
                No interactions logged yet - your chart will appear here.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md h-72 sm:h-80 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="62%"
                    outerRadius="85%"
                    paddingAngle={4}
                    dataKey="value"
                    cornerRadius={8}
                  >
                    {data.map(entry => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #f1f5f9',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-10">
                <span className="text-3xl font-bold text-gray-900">
                  {total}
                </span>
                <span className="text-xs text-gray-400">Total</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;

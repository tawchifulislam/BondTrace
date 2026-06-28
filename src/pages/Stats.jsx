import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

  const COLORS = ['#244D3F', '#7E35E1', '#37A163'];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Friendship Analytics
        </h1>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-4xl">
          <h2 className="text-sm font-semibold text-gray-700 mb-6 text-center">
            By Interaction Type
          </h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="75%"
                  paddingAngle={3}
                  dataKey="value"
                  cornerRadius={6}
                >
                  {data.map((entry, ind) => (
                    <Cell key={`cell-${ind}`} fill={COLORS[ind]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

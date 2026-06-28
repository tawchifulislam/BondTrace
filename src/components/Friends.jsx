import React from 'react';
import { Link } from 'react-router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useFriendsContext } from '../context/FriendsContext';

const Friends = () => {
  const { friends, loading } = useFriendsContext();

  const getStatusColor = status => {
    if (status === 'on-track') return 'bg-[#244D3F] text-white';
    if (status === 'overdue') return 'bg-[#EF4444] text-white';
    if (status === 'almost due') return 'bg-[#EFAD44] text-black';
    return 'bg-gray-200 text-black';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-[#244D3F]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <h2 className="text-xl font-bold mb-4 text-black">Your Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {friends.map(friend => (
          <Link to={`/friend/${friend.id}`} key={friend.id}>
            <div className="bg-white shadow rounded p-4 text-center h-full">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border"
              />
              <h3 className="font-semibold text-black">{friend.name}</h3>
              <p className="text-sm text-black">
                {friend.days_since_contact}d ago
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-2">
                {friend.tags.map((tag, ind) => (
                  <span
                    key={ind}
                    className="text-xs bg-gray-200 px-2 py-1 rounded text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className={`inline-block px-3 py-1 rounded text-sm ${getStatusColor(friend.status)}`}
              >
                {friend.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Friends;

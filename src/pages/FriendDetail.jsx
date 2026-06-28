import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IoIosCall } from 'react-icons/io';
import { IoMdText } from 'react-icons/io';
import { CiVideoOn } from 'react-icons/ci';
import { MdOutlineSnooze, MdArchive, MdDelete } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const FriendDetail = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(f => f.id === parseInt(id));
        setFriend(found);
        const saved = JSON.parse(localStorage.getItem('timeline') || '[]');
        const filtered = saved.filter(e => e.friend === found?.name);
        setInteractions(filtered);
      });
  }, [id]);

  if (!friend) return null;

  const getStatusColor = status => {
    if (status === 'on-track') return 'bg-[#244D3F] text-white';
    if (status === 'overdue') return 'bg-[#EF4444] text-white';
    if (status === 'almost due') return 'bg-[#EFAD44] text-black';
    return 'bg-gray-200 text-black';
  };

  const addInteraction = type => {
    const newEntry = {
      type,
      friend: friend.name,
      date: new Date().toLocaleString(),
    };
    const updated = [...interactions, newEntry];
    setInteractions(updated);
    const oldEntries = JSON.parse(localStorage.getItem('timeline') || '[]');
    localStorage.setItem('timeline', JSON.stringify([...oldEntries, newEntry]));

    const toastStyle = {
      background: '#244D3F',
      color: '#fff',
    };

    if (type === 'Call') {
      toast(
        <div className="flex items-center gap-2">
          <IoIosCall /> Call to {friend.name}
        </div>,
        { style: toastStyle },
      );
    } else if (type === 'Text') {
      toast(
        <div className="flex items-center gap-2">
          <IoMdText /> Text to {friend.name}
        </div>,
        { style: toastStyle },
      );
    } else if (type === 'Video') {
      toast(
        <div className="flex items-center gap-2">
          <CiVideoOn /> Video call with {friend.name}
        </div>,
        { style: toastStyle },
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] py-10">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-6 text-center shadow-sm">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 border"
            />
            <h1 className="font-bold text-black text-lg">{friend.name}</h1>
            <div className="flex flex-wrap gap-1.5 justify-center mt-2">
              <span
                className={`text-xs px-2 py-1 rounded ${getStatusColor(friend.status)}`}
              >
                {friend.status}
              </span>
              {friend.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 px-2 py-1 rounded text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-black italic mt-3">"{friend.bio}"</p>
            <p className="text-xs text-black mt-2">Preferred: {friend.email}</p>
          </div>

          <div className="bg-white border rounded-lg shadow-sm divide-y">
            <button className="w-full flex items-center gap-2 px-5 py-3 text-sm text-black hover:bg-gray-50">
              <MdOutlineSnooze /> Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center gap-2 px-5 py-3 text-sm text-black hover:bg-gray-50">
              <MdArchive /> Archive
            </button>
            <button className="w-full flex items-center gap-2 px-5 py-3 text-sm text-red-500 hover:bg-red-50">
              <MdDelete /> Delete
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
              <p className="text-xl font-bold text-[#1e3d2f]">{friend.goal}</p>
              <p className="text-xs text-black mt-1">Goal (Days)</p>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
              <p className="text-xl font-bold text-[#1e3d2f]">
                {friend.next_due_date}
              </p>
              <p className="text-xs text-black mt-1">Next Due</p>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-black">Relationship Goal</h3>
              <button className="text-xs border rounded px-3 py-1 text-black hover:bg-gray-50">
                Edit
              </button>
            </div>
            <p className="text-sm text-black">
              Connect every{' '}
              <span className="font-bold text-black">{friend.goal} days</span>
            </p>
          </div>

          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-black mb-3">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => addInteraction('Call')}
                className="flex flex-col items-center gap-2 py-4 rounded-lg border hover:bg-[#2d5a45] hover:text-white text-black"
              >
                <IoIosCall size={22} /> Call
              </button>
              <button
                onClick={() => addInteraction('Text')}
                className="flex flex-col items-center gap-2 py-4 rounded-lg border hover:bg-[#2d5a45] hover:text-white text-black"
              >
                <IoMdText size={22} /> Text
              </button>
              <button
                onClick={() => addInteraction('Video')}
                className="flex flex-col items-center gap-2 py-4 rounded-lg border hover:bg-[#2d5a45] hover:text-white text-black"
              >
                <CiVideoOn size={22} /> Video
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-black">Recent Interactions</h3>
              <button className="text-xs border rounded px-3 py-1 text-black hover:bg-gray-50">
                Full History
              </button>
            </div>
            {interactions.length === 0 ? (
              <p className="text-sm text-black text-center py-6">
                No interactions yet.
              </p>
            ) : (
              <div className="divide-y">
                {interactions.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm font-semibold text-black">
                      {entry.type}
                    </span>
                    <span className="text-xs text-black">{entry.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;

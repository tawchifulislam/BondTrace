import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { IoIosCall, IoMdText } from 'react-icons/io';
import { CiVideoOn } from 'react-icons/ci';
import { MdOutlineSnooze, MdArchive, MdDelete } from 'react-icons/md';
import {
  HiOutlineMail,
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineFlag,
  HiOutlineClock,
} from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { useFriendsContext } from '../context/FriendsContext';

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFriendById, loading } = useFriendsContext();
  const friend = getFriendById(id);

  const [interactions, setInteractions] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('timeline') || '[]');
    return saved.filter(e => e.friend === friend?.name);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-[#244D3F]" />
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <p className="text-sm text-gray-400">Friend not found.</p>
      </div>
    );
  }

  const statusStyles = {
    'on-track': 'bg-[#244D3F] text-white',
    overdue: 'bg-[#EF4444] text-white',
    'almost due': 'bg-[#EFAD44] text-black',
  };
  const getStatusColor = status =>
    statusStyles[status] || 'bg-gray-200 text-black';

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

    const toastStyle = { background: '#244D3F', color: '#fff' };
    const icons = {
      Call: <IoIosCall />,
      Text: <IoMdText />,
      Video: <CiVideoOn />,
    };
    const verbs = {
      Call: 'Call to',
      Text: 'Text to',
      Video: 'Video call with',
    };

    toast(
      <div className="flex items-center gap-2">
        {icons[type]} {verbs[type]} {friend.name}
      </div>,
      { style: toastStyle },
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Toaster position="top-center" />

      <div className="bg-linear-to-b from-white to-[#f8fafc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#244D3F] transition-colors mb-6"
          >
            <HiOutlineArrowLeft /> Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-md mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left flex-1">
              <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
                {friend.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                {friend.bio}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(friend.status)}`}
                >
                  {friend.status}
                </span>
                {friend.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={`mailto:${friend.email}`}
              className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-[#244D3F] border border-gray-200 rounded-full px-4 py-2 transition-colors self-start"
            >
              <HiOutlineMail /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
            <span className="w-9 h-9 rounded-full bg-[#244D3F]/10 text-[#244D3F] flex items-center justify-center">
              <HiOutlineClock />
            </span>
            <p className="text-xl font-bold text-gray-900">
              {friend.days_since_contact}d
            </p>
            <p className="text-xs text-gray-500">Since Last Contact</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
            <span className="w-9 h-9 rounded-full bg-[#7E35E1]/10 text-[#7E35E1] flex items-center justify-center">
              <HiOutlineFlag />
            </span>
            <p className="text-xl font-bold text-gray-900">{friend.goal}d</p>
            <p className="text-xs text-gray-500">Contact Goal</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2 col-span-2 sm:col-span-1">
            <span className="w-9 h-9 rounded-full bg-[#37A163]/10 text-[#37A163] flex items-center justify-center">
              <HiOutlineCalendar />
            </span>
            <p className="text-xl font-bold text-gray-900">
              {friend.next_due_date}
            </p>
            <p className="text-xs text-gray-500">Next Due Date</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Check-In
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => addInteraction('Call')}
                  className="flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#244D3F] hover:text-white text-gray-700 transition-colors"
                >
                  <IoIosCall size={22} />{' '}
                  <span className="text-xs font-medium">Call</span>
                </button>
                <button
                  onClick={() => addInteraction('Text')}
                  className="flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#7E35E1] hover:text-white text-gray-700 transition-colors"
                >
                  <IoMdText size={22} />{' '}
                  <span className="text-xs font-medium">Text</span>
                </button>
                <button
                  onClick={() => addInteraction('Video')}
                  className="flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#37A163] hover:text-white text-gray-700 transition-colors"
                >
                  <CiVideoOn size={22} />{' '}
                  <span className="text-xs font-medium">Video</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Recent Interactions
                </h3>
                <span className="text-xs text-gray-400">
                  {interactions.length} total
                </span>
              </div>
              {interactions.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-10">
                  No interactions yet.
                </p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {interactions
                    .slice()
                    .reverse()
                    .map((entry, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                          {entry.type === 'Call' && (
                            <IoIosCall className="text-[#244D3F]" />
                          )}
                          {entry.type === 'Text' && (
                            <IoMdText className="text-[#7E35E1]" />
                          )}
                          {entry.type === 'Video' && (
                            <CiVideoOn className="text-[#37A163]" />
                          )}
                          {entry.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {entry.date}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">
                  Relationship Goal
                </h3>
                <button className="text-xs font-medium border border-gray-200 rounded-full px-3.5 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Connect every{' '}
                <span className="font-semibold text-gray-900">
                  {friend.goal} days
                </span>
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <MdOutlineSnooze className="text-base" /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <MdArchive className="text-base" /> Archive
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <MdDelete className="text-base" /> Delete
              </button>
            </div>

            <a
              href={`mailto:${friend.email}`}
              className="md:hidden flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#244D3F] border border-gray-200 rounded-full px-4 py-3 transition-colors"
            >
              <HiOutlineMail /> {friend.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;

import React from 'react';
import Friends from '../components/Friends';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <section className="bg-[#f8fafc] min-h-screen flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 flex flex-col items-center">
        <div className="text-black max-w-md md:max-w-xl text-center">
          <h1 className="font-bold text-2xl md:text-3xl mb-2">
            Friends to keep close in your life
          </h1>
          <p className="mb-6 text-sm md:text-base">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <button className="btn bg-[#244D3F] px-4 py-2 rounded-md text-white flex items-center gap-2 mx-auto">
            <FaPlus />
            Add a Friend
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full">
          <div className="bg-white shadow rounded p-4 text-center text-black">
            <h2 className="font-bold text-xl">10</h2>
            <p>Total Friends</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center text-black">
            <h2 className="font-bold text-xl">4</h2>
            <p>On Track</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center text-black">
            <h2 className="font-bold text-xl">6</h2>
            <p>Need Attention</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center text-black">
            <h2 className="font-bold text-xl">12</h2>
            <p>Interactions This Month</p>
          </div>
        </div>
      </div>

      <Friends />
    </section>
  );
};

export default Home;

import React from 'react';
import Logo from './Logo';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#244d3f] text-white">
      <div className="flex flex-col items-center text-center gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Logo variant="footer" />
        <p className="font-bold text-sm sm:text-base max-w-md">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <p className="font-bold">Social Links</p>
        <div className="flex gap-4 justify-center text-2xl">
          <a>
            <FaFacebook />
          </a>
          <a>
            <FaYoutube />
          </a>
          <a>
            <FaXTwitter />
          </a>
        </div>
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

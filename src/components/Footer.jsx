import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router';
import { FaFacebook, FaYoutube, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-[#0f1f1a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <Logo variant="footer" />
            <p className="text-sm text-gray-400 max-w-sm">
              Your personal shelf of meaningful connections. Browse, tend, and
              nurture the relationships that matter most.
            </p>
            <div className="flex gap-4 text-lg pt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#37A163] hover:text-white transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="X"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#37A163] hover:text-white transition-colors"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#37A163] hover:text-white transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#37A163] hover:text-white transition-colors"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#37A163] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/timeline"
                  className="hover:text-[#37A163] transition-colors"
                >
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  to="/stats"
                  className="hover:text-[#37A163] transition-colors"
                >
                  Stats
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@bondtrace.app"
              className="flex items-center gap-2 text-sm hover:text-[#37A163] transition-colors"
            >
              <HiOutlineMail />
              hello@bondtrace.app
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BondTrace. All rights reserved.</p>
          <p>Built with Love and Empathy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

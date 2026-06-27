import React from 'react';
import { FaLink } from 'react-icons/fa6';

const Logo = ({ variant = 'navbar' }) => {
  const isFooter = variant === 'footer';

  return (
    <div className="flex items-center gap-2 select-none">
      <span
        className={`flex items-center justify-center rounded-lg ${
          isFooter ? 'w-12 h-12 text-2xl' : 'w-9 h-9 text-base'
        } bg-[#244D3F] text-white`}
      >
        <FaLink />
      </span>
      <span
        className={`font-bold tracking-tight ${
          isFooter ? 'text-3xl text-white' : 'text-xl text-[#244D3F]'
        }`}
      >
        Bond<span className="text-[#37A163]">Trace</span>
      </span>
    </div>
  );
};

export default Logo;

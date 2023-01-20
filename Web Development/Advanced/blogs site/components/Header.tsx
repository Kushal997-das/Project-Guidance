import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className=" flex items-center space-x-2">
        <Link href="/">
          <Image
            src="/NFT.webp"
            width={50}
            height={50}
            className="rounded-full"
            alt="Logo"
          />
        </Link>
        <h1>Blogger</h1>
      </div>
      <div className="px-5 py-3 text-sm md:text-base bg-gray-900 text-yellow-500 flex items-center rounded-full text-center">
        <Link href="/auth">Signup/Login</Link>
      </div>
    </header>
  );
};

export default Header;

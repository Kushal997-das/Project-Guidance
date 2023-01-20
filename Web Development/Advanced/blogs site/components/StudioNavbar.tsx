import React from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const StudioNavbar = (props: any) => {
  return (
    <div className="bg-[#1a1a1a]">
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-yellow-500 space-x-2 flex items-center">
          <span>
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </span>
          <span>Go to Website</span>
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;

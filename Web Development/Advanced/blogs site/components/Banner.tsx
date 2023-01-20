import React from 'react';

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5 mb-10">
      <div className="space-y-4">
        <h1 className="text-7xl">Blogerrr</h1>
        <h2 className="mt-5 md:mt-0">
          Welcome to Every{' '}
          <span className="underline decoration-4 decoration-yellow-400">
            Technology Geeks
          </span>{' '}
          favourite blog in Techsphere.
        </h2>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        Explore new blogs on Technology
      </p>
    </div>
  );
};

export default Banner;

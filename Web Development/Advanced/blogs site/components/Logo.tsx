import Image from 'next/image';
import React from 'react';

const Logo = (props: any) => {
  const { renderDefault, title } = props;
  return (
    <div className="flex items-center space-x-2">
      <Image
        width={50}
        height={50}
        alt="logo"
        className="rounded-full object-cover"
        src="/NFT.webp"
      />
      {renderDefault && <>{renderDefault(props)}</>}
    </div>
  );
};

export default Logo;

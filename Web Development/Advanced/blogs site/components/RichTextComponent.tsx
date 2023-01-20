import Image from 'next/image';
import React from 'react';
import urlFor from '../lib/urlFor';

const RichTextComponent = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 m-10 mx-auto">
          <Image
            className="object-contain"
            src={value ? urlFor(value).url() : ''}
            alt={`Blog Post Image`}
            fill
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: { children: any }) => {
      return <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>;
    },
    number: ({ children }: { children: any }) => {
      return <ol className="mt-lg list-decimal">{children}</ol>;
    },
  },
  block: {
    h1: (props: any) => {
      return <h1 className="text-5xl py-10 font-bold" {...props} />;
    },
    h2: (props: any) => {
      return <h1 className="text-4xl py-10 font-bold" {...props} />;
    },
    h3: (props: any) => {
      return <h1 className="text-3xl py-10 font-bold" {...props} />;
    },
    h4: (props: any) => {
      return <h1 className="text-2xl py-10 font-bold" {...props} />;
    },
    normal: (props: any) => {
      return <p className="pb-3" {...props} />;
    },
    blockquote: ({ children }: { children: any }) => {
      return (
        <blockquote className="border-l-yellow-500 border-l-4 pl-5 py-5 my-5">
          {children}
        </blockquote>
      );
    },
    marks: {
      link: (props: any) => {
        return (
          <span className="text-blue-700 underline">
            <a target="_blank" rel="no-reffer" {...props} />
          </span>
        );
      },
    },
  },
};

export default RichTextComponent;

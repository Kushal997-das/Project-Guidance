import { groq } from 'next-sanity';
import Image from 'next/image';
import React from 'react';
import { client } from '../../../../lib/sanity.client';
import urlFor from '../../../../lib/urlFor';
import { Post } from '../../../../typings';
import PortableText from 'react-portable-text';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const query = groq`
        *[_type=='post']{
            slug
        }
    `;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);
  return slugRoutes.map((slug) => ({
    slug,
  }));
}

const Post = async ({ params: { slug } }: Props) => {
  const query = groq`
        *[_type=='post' && slug.current == $slug][0]{
            ...,
            author->,
            categories[]->
        }
    `;

  const post: Post = await client.fetch(query, { slug });
  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-yellow-500 text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className="p-5 bg-yellow-500 w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div className="">
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />

                <div className="">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div className=""></div>
                </div>
              </div>
            </div>

            <div className="">
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => {
                  return (
                    <p
                      key={category._id}
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                    >
                      {category.title}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText
        content={post.body}
        className=""
        serializers={{
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
          image: ({ value }: any) => {
            return (
              <div className="relative w-full h-96 m-10 mx-auto">
                <Image
                  className="object-contain"
                  src={value ? urlFor(value).url() : ''}
                  alt={`${post.title} | Image`}
                  fill
                />
              </div>
            );
          },
          link: (props: any) => {
            return (
              <span className="text-blue-700 underline">
                <a target="_blank" rel="no-reffer" {...props} />
              </span>
            );
          },
          bullet: ({ children }: { children: any }) => {
            return (
              <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
            );
          },
          number: ({ children }: { children: any }) => {
            return <ol className="mt-lg list-decimal">{children}</ol>;
          },
        }}
      />
    </article>
  );
};

export default Post;

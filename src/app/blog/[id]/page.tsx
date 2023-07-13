import { FC } from 'react';
import { Post as TPost } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'GET',
    next: { revalidate: 5 },
  });
  const post: TPost = await res.json();

  return {
    title: post.title,
  };
}

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'GET',
    next: { revalidate: 5 },
  });
  const post: TPost = await res.json();

  if (res.status === 404) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl uppercase pb-2">{post.title}</h1>
      <article>{post.body}</article>
    </>
  );
};

export default Page;

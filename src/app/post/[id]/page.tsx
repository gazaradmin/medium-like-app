import { FC } from 'react';
import { notFound } from 'next/navigation';
import { getPosts, getPostById } from '@/lib/prisma/posts';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const { post } = await getPostById(id);

  return {
    title: post?.title,
    description: post?.body,
  };
}

// export async function generateStaticParams() {
//   const { posts } = await getPosts();
//   return posts?.map((post) => ({ id: post.id }));
// }

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const { post, error } = await getPostById(id);

  if (error) {
    throw new Error(error.message);
  }

  if (!post) {
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

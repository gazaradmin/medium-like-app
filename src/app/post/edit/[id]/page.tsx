import PostForm from '@/components/post/Form';
import { getPostById } from '@/lib/prisma/posts';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const { post, error } = await getPostById(id);

  if (error) {
    throw new Error(error);
  }

  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
};

export default Page;

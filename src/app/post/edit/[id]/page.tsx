import PostForm from '@/components/post/Form';
import { FC } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = ({ params: { id } }) => {
  return <PostForm id={id} />;
};

export default Page;

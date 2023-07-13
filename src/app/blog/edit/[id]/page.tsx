import BlogForm from '@/components/blog/Form';
import { FC } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = ({ params: { id } }) => {
  return <BlogForm id={id} />;
};

export default Page;

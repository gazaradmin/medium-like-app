import { FC } from 'react';
import Author from '@/components/Author';

interface PageProps {}

const Page: FC<PageProps> = async () => {
  const signInUserId = 1;

  return <Author authorId={signInUserId} />;
};

export default Page;

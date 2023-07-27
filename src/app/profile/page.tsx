import { FC } from 'react';
import Author from '@/components/Author';
// import { useSession } from 'next-auth/react';

interface PageProps {}

const Page: FC<PageProps> = async () => {
  // const { data: session } = useSession();
  const signInUserId = 1;

  return <Author authorId={signInUserId} />;
};

export default Page;

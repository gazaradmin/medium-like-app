import Author from '@/components/Author';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  if (!session.user) {
    redirect('/signin');
  }

  return <Author user={session.user} />;
};

export default Page;

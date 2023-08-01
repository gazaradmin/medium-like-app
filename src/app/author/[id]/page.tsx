import Author from '@/components/Author';
import { getUserById } from '@/lib/prisma/users';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: {
    id: string;
  };
}

const AuthorPage = async ({ params: { id } }: AuthorPageProps) => {
  const { user, error } = await getUserById(id);
  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    notFound();
  }

  return <Author user={user} />;
};

export default AuthorPage;

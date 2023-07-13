import Author from '@/components/Author';
import { FC } from 'react';

interface AuthorPageProps {
  params: {
    id: string;
  };
}

const AuthorPage: FC<AuthorPageProps> = ({ params: { id } }) => {
  return <Author authorId={parseInt(id)} />;
};

export default AuthorPage;

import { FC } from 'react';
import Post from '@/components/post/Post';
import { getPosts } from '@/lib/prisma/posts';
import { DefaultUser } from 'next-auth';
interface AuthorProps {
  user: DefaultUser;
}
const Author: FC<AuthorProps> = async ({ user }) => {
  const { posts = [], error } = await getPosts({
    where: { userId: user.id },
    take: 10,
  });

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {' '}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        {' '}
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {' '}
          {user.name}{' '}
        </h1>{' '}
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {user.email}
        </p>{' '}
      </div>{' '}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {' '}
        {!posts.length && 'No posts found.'}{' '}
        {posts.map((post) => (
          <Post isEditable={true} key={post.id} post={post} />
        ))}{' '}
      </ul>{' '}
    </div>
  );
};
export default Author;

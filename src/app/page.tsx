import Post from '@/components/post/Post';
import { getPosts } from '@/lib/prisma/posts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { posts, error } = await getPosts({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  if (error) {
    throw error;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Latest
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A blog created with Next.js and Tailwind.css
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts?.length && 'No posts found.'}
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

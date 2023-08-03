import { getPosts } from '@/lib/prisma/posts';
import { notFound } from 'next/navigation';
import Post from '@/components/post/Post';
import Pagination from '@/components/common/Pagination';

interface PageProps {
  searchParams: {
    page?: string;
  };
}

const POSTS_PER_PAGE = 2;

const Page = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page || '1');
  const skip = page * POSTS_PER_PAGE - POSTS_PER_PAGE;

  const {
    posts = [],
    count = 0,
    error,
  } = await getPosts({ take: POSTS_PER_PAGE, skip });

  if (error) {
    throw new Error(error.message);
  }

  if (!posts) {
    notFound();
  }

  const totalPages = Math.ceil(count / POSTS_PER_PAGE);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  );
};

export default Page;

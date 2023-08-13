import { Post as TPost } from '@prisma/client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';

interface ItemProps {
  post: TPost;
  isEditable?: boolean;
}

const Item = ({ post, isEditable = false }: ItemProps) => {
  const { id, title, body, publishedAt } = post;

  const formatedDate = dayjs(publishedAt).format('YYYY-MM-DD');

  return (
    <li key={id} className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={formatedDate}>{formatedDate}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/post/${id}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {body}
              </div>
            </div>
            <div className="text-base font-medium leading-6 flex space-x-2 justify-between">
              <Link
                href={`/post/${id}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Read more &rarr;
              </Link>
              <div>
                {isEditable && (
                  <Button>
                    <Link href={`/post/edit/${post.id}`}>Edit</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Item;

import Post from '@/components/post/Post';
import { getClient } from '@/lib/apollo';
import { ApolloQueryResult, gql } from '@apollo/client';
import { Post as TPost } from '@prisma/client';

const query = gql`
  query {
    posts {
      id
      body
      description
      title
      usersId
    }
  }
`;

export default async function Page() {
  const { data, error, loading }: ApolloQueryResult<{ posts: [TPost] }> =
    await getClient().query({ query });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <ul>
        {!data.posts.length && 'No data found.'}
        {data.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

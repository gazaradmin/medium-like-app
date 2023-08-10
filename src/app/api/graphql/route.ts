// /pages/api/graphql.ts
import { schema } from '@/lib/graphql/schema';
import { createYoga } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

const { handleRequest } = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
});
export { handleRequest as GET, handleRequest as POST };

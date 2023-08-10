// /graphql/types/Link.ts

import { builder } from '@/lib/graphql/builder';
import client from '@/lib/prisma';

builder.prismaObject('Post', {
  fields: (t) => ({
    id: t.exposeID('id'),
    description: t.exposeString('description'),
    body: t.exposeString('body'),
    title: t.exposeString('title'),
    usersId: t.exposeString('userId'),
  }),
});

// 1.
builder.queryField('posts', (t) =>
  // 2.
  t.prismaField({
    // 3.
    type: ['Post'],
    // 4.
    resolve: (query, _parent, _args, _ctx, _info) =>
      client.post.findMany({ ...query }),
  })
);

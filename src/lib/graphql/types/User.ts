// /graphql/types/User.ts

import { builder } from '@/lib/graphql/builder';
import client from '@/lib/prisma';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
  }),
});

builder.queryField('users', (t) =>
  // 2.
  t.prismaField({
    // 3.
    type: ['User'],
    // 4.
    resolve: (query, _parent, _args, _ctx, _info) =>
      client.user.findMany({ ...query }),
  })
);

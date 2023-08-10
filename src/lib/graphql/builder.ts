// graphql/builder.ts

// 1.
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import client from '@/lib/prisma';

// 2.
export const builder = new SchemaBuilder<{
  // 3.
  PrismaTypes: PrismaTypes;
  Context: {};
}>({
  // 4.
  plugins: [PrismaPlugin],
  prisma: {
    client: client,
  },
});

// 5.
builder.queryType({});

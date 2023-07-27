import { Prisma } from '@prisma/client';
import prisma from '.';

export async function getPosts(args?: Prisma.PostFindManyArgs) {
  try {
    const result = await prisma.post.findMany(args);

    return { posts: result };
  } catch (error: any) {
    return { error };
  }
}

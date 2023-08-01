import { Prisma } from '@prisma/client';
import prisma from '.';

export const getPosts = async (args?: Prisma.PostFindManyArgs) => {
  try {
    const result = await prisma.post.findMany(args);

    return { posts: result };
  } catch (error: any) {
    return { error };
  }
};

export const getPostById = async (id: string) => {
  try {
    const result = await prisma.post.findUnique({
      where: { id },
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

export const createPost = async (data: Prisma.PostCreateInput) => {
  try {
    const result = await prisma.post.create({ data });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

export const updatePost = async (id: string, data: Prisma.PostUpdateInput) => {
  try {
    const result = await prisma.post.update({
      where: { id },
      data,
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

export const deletePost = async (id: string) => {
  try {
    const result = await prisma.post.delete({
      where: { id },
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

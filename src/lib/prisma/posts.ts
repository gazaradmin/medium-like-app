'use server';

import { Prisma } from '@prisma/client';
import prisma from '.';

export const getPosts = async (args?: Prisma.PostFindManyArgs) => {
  try {
    const posts = await prisma.post.findMany(args);
    const count = await prisma.post.count();

    return { posts, count };
  } catch (error: any) {
    return { error };
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    return { post };
  } catch (error: any) {
    return { error };
  }
};

export const createPost = async (data: Prisma.PostCreateInput) => {
  try {
    const post = await prisma.post.create({ data });

    return { post };
  } catch (error: any) {
    return { error };
  }
};

export const updatePost = async (id: string, data: Prisma.PostUpdateInput) => {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    });

    return { post };
  } catch (error: any) {
    return { error };
  }
};

export const deletePost = async (id: string) => {
  try {
    const post = await prisma.post.delete({
      where: { id },
    });

    return { post };
  } catch (error: any) {
    return { error };
  }
};

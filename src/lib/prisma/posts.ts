import { Prisma } from '@prisma/client';
import prisma from '.';

const getPosts = async (args?: Prisma.PostFindManyArgs) => {
  try {
    const result = await prisma.post.findMany(args);

    return { posts: result };
  } catch (error: any) {
    return { error };
  }
};

const getPostById = async (id: string) => {
  try {
    const result = await prisma.post.findUnique({
      where: { id },
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

const createPost = async (data: Prisma.PostCreateInput) => {
  try {
    const result = await prisma.post.create({ data });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

const updatePost = async (id: string, data: Prisma.PostUpdateInput) => {
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

const deletePost = async (id: string) => {
  try {
    const result = await prisma.post.delete({
      where: { id },
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
};

export { createPost, getPosts, getPostById, updatePost, deletePost };

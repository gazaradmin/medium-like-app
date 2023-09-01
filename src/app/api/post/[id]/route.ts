import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { deletePost, getPostById, updatePost } from '@/lib/prisma/posts';
import { authOptions } from '@/lib/utils/authOptions';

type requestType = {
  params: {
    id: string;
  };
};

export async function PUT(
  request: NextRequest,
  { params: { id } }: requestType
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response('Unauthorization', { status: 401 });
  }

  const post = await getPostById(id);
  if (!post) {
    return new Response('Not Found', { status: 404 });
  }
  const body = (await request.json()) as Prisma.PostUpdateInput;
  const updatedPost = await updatePost(id, body);

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  _request: NextRequest,
  { params: { id } }: requestType
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response('Unauthorization', { status: 401 });
  }

  const post = await getPostById(id);
  if (!post) {
    return new Response('Not Found', { status: 404 });
  }
  const deletedPost = await deletePost(id);

  return NextResponse.json(deletedPost);
}

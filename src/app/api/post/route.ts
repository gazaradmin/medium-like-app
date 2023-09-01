import { createPost } from '@/lib/prisma/posts';
import { authOptions } from '@/lib/utils/authOptions';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response('Unauthorization', { status: 401 });
  }

  const requestData = (await request.json()) as Prisma.PostCreateInput;
  const createdPost = await createPost({
    ...requestData,
    publishedAt: requestData.published ? new Date() : null,
    userId: session?.user?.id,
  });

  return NextResponse.json(createdPost);
}

import prisma from '.';
import _ from 'lodash';

export async function getUserById(id: string) {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
    });

    return { user: _.omit(result, ['emailVerified']) };
  } catch (error: any) {
    return { error };
  }
}

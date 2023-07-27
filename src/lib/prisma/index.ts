import { PrismaClient } from '@prisma/client';

// See here: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
}
// `stg` or `dev`
else {
  //@ts-ignore
  if (!global.prisma) {
    //@ts-ignore
    global.prisma = new PrismaClient();
  }
  //@ts-ignore
  prisma = global.prisma;
}

export default prisma;

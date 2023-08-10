import { builder } from '@/lib/graphql/builder';
import '@/lib/graphql/types/User';
import '@/lib/graphql/types/Post';

// graphql/schema.ts
export const schema = builder.toSchema();

'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Post as TPost } from '@prisma/client';
import { addPost, editPost, removePost } from '@/app/_actions/posts';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface PostFormProps {
  post?: TPost;
}

const formSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).nonempty(),
  body: z.string({ required_error: 'Body is required' }).nonempty(),
});

const PostForm: FC<PostFormProps> = ({ post }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post ? post.title : '',
      body: post ? post.body : '',
    },
  });

  const { data: session } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit');
    if (post) {
      editPost(post.id, values)
        .then(() => {
          toast({
            title: 'Update Post Success',
            description: post?.title,
          });
          console.log('EDIT POST');
          router.push(`/post/${post?.id}`);
        })
        .catch(({ error }) => {
          toast({
            title: 'Error',
            description: error.message,
          });
        });
    } else {
      addPost({ ...values, userId: session?.user?.id || '' })
        .then(({ post }) => {
          toast({
            title: 'Add Post Success',
            description: post?.title,
          });
          console.log('ADD POST');
          router.push(`/post/${post?.id}`);
        })
        .catch(({ error }) => {
          toast({
            title: 'Error',
            description: error.message,
          });
        });
    }
  };

  const onDelete = () => {
    console.log('POST', post);
    if (post) {
      if (confirm('Та устгахыг хүсч байна уу?'))
        removePost(post.id)
          .then(() => {
            router.push('/profile');
          })
          .catch(({ error }) =>
            toast({
              title: 'Error',
              description: error.message,
            })
          );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
        {post ? 'Blog Update' : 'Create Blog'}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea className="h-96" placeholder="body" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {!post ? (
              ''
            ) : (
              <Button
                className="float-left bg-pink-600 hover:bg-pink-700"
                variant={'destructive'}
                onClick={onDelete}
                type="button"
              >
                Delete
              </Button>
            )}
            <Button className="float-right " type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PostForm;

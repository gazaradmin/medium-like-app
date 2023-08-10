export const resolvers = {
  Query: {
    posts: () => {
      return [
        {
          id: '12345',
          title: 'Next.js',
          description: 'Fullstack React framework',
          body: 'Fullstack React framework for body',
          userId: '12345',
        },
        {
          id: '56789',
          title: 'Next.js',
          description: 'Fullstack React framework',
          body: 'Fullstack React framework for body',
          userId: '56789',
        },
        {
          id: '987654',
          title: 'Next.js',
          description: 'Fullstack React framework',
          body: 'Fullstack React framework for body',
          userId: '987654',
        },
      ];
    },
  },
};

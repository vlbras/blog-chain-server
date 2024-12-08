import { Post } from '#post/models';

export type Topic = {
  id: string;
  name: string;
  posts: Pick<Post, 'id' | 'title'>[];
  // TODO: create TopicForAdmin
  // createdAt: string;
  // updatedAt: string;
};

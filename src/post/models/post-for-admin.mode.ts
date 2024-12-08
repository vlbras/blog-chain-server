import { Post } from './post.model';

export type PostForAdmin = Post & {
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

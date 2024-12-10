import { PostModel } from './post.model';

export class PostForAdmin extends PostModel {
  public createdBy: UserProps;
  public updatedBy?: UserProps;
  public createdAt: string;
  public updatedAt: string;
}

class UserProps {
  public id: string;
  public email: string;
}

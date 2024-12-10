export class TopicModel {
  public id: string;
  public name: string;
  public posts: PostProps[];
}

class PostProps {
  public id: string;
  public title: string;
}

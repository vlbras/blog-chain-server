import { ApiProperty } from '@nestjs/swagger';

class PostProps {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;
}

export class TopicModel {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty({ type: [PostProps] })
  public posts: PostProps[];
}

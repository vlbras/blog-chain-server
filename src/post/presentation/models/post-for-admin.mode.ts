import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PostModel } from './post.model';

class UserProps {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;
}

export class PostForAdmin extends PostModel {
  @ApiProperty()
  public createdBy: UserProps;

  @ApiPropertyOptional()
  public updatedBy?: UserProps;

  @ApiProperty()
  public createdAt: string;

  @ApiProperty()
  public updatedAt: string;
}

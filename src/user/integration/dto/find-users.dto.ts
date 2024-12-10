import { Optional } from '@nestjs/common';
import { IsMongoId } from 'class-validator';

export class FindUsersDto {
  @Optional()
  @IsMongoId({ each: true })
  public ids?: string[];
}

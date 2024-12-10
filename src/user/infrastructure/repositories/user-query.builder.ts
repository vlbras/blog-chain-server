import { BadRequestException } from '@nestjs/common';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';

import { UserEntity } from '../entities/user.entity';

import { AtLeastOne, UserRoles } from '#common';

export class UserQueryBuilder {
  public static findUserQuery(input: FindUserInput): FilterQuery<UserEntity> {
    const filter: FilterQuery<UserEntity> = {};

    input.id && (filter._id = new Types.ObjectId(input.id));
    input.email && (filter.email = input.email);

    return filter;
  }

  public static findUsersQuery(input: FindUsersInput): FilterQuery<UserEntity> {
    const filter: FilterQuery<UserEntity> = {};

    input.ids && (filter._id = { $in: input.ids });
    input.role && (filter.role = input.role);

    // TODO: add pagination

    return filter;
  }

  public static updateUserQuery(input: UpdateUserInput): UpdateQuery<UserEntity> {
    if (Object.keys(input).length === 0) {
      throw new BadRequestException('No data provided');
    }

    return input;
  }
}

export type FindUserInput = AtLeastOne<{
  id?: string;
  email?: string;
}>;

export type FindUsersInput = {
  ids?: string[];
  role?: UserRoles;
};

export type UpdateUserInput = {
  email?: string;
  password?: string;
  role?: UserRoles;
};

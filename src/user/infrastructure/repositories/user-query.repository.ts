import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindUserInput, FindUsersInput, UserQueryBuilder } from './user-query.builder';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

import { User } from '#user/domain/models';

@Injectable()
export class UserQueryRepository {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly userEntity: Model<UserEntity>,
  ) {}

  public async findOne(input: FindUserInput): Promise<User | null> {
    const filter = UserQueryBuilder.findUserQuery(input);
    const user = await this.userEntity.findOne(filter).lean().exec();

    return user ? UserMapper.mapEntityToModel(user) : null;
  }

  public async findOneOrThrow(input: FindUserInput): Promise<User> {
    const user = await this.findOne(input);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async findMany(input: FindUsersInput): Promise<User[]> {
    const filter = UserQueryBuilder.findUsersQuery(input);
    const users = await this.userEntity.find(filter).sort({ createdAt: -1 }).lean().exec();

    return users.map(UserMapper.mapEntityToModel);
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindUserInput, FindUsersInput, UpdateUserInput, UserQueryBuilder } from './user-query.builder';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

import { UserRoles } from '#common';
import { User } from '#user/domain/models';

@Injectable()
export class UserCommandRepository {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly userEntity: Model<UserEntity>,
  ) {}

  public async create(input: CreateUserInput): Promise<User> {
    try {
      const user = await this.userEntity.create(input);
      return UserMapper.mapEntityToModel(user);
    } catch (err) {
      if (err.code === 11000) {
        const message = `User already exists`;
        throw new ConflictException(message);
      }
      throw err;
    }
  }

  public async createMany(input: CreateUserInput[]): Promise<number> {
    return (await this.userEntity.insertMany(input)).length;
  }

  public async updateOne(input: FindUserInput, data: UpdateUserInput): Promise<User> {
    try {
      const filter = UserQueryBuilder.findUserQuery(input);
      const updateData = UserQueryBuilder.updateUserQuery(data);
      const user = await this.userEntity.findOneAndUpdate(filter, updateData, { lean: true, new: true }).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return UserMapper.mapEntityToModel(user);
    } catch (err) {
      if (err.code === 11000) {
        const message = `User already exists`;
        throw new ConflictException(message);
      }
      throw err;
    }
  }

  public async updateMany(input: FindUsersInput, data: UpdateUserInput): Promise<number> {
    const filter = UserQueryBuilder.findUsersQuery(input);
    const updateData = UserQueryBuilder.updateUserQuery(data);

    return (await this.userEntity.updateMany(filter, updateData)).modifiedCount;
  }

  public async deleteOne(input: FindUserInput): Promise<void> {
    const filter = UserQueryBuilder.findUserQuery(input);
    const user = await this.userEntity.findOneAndDelete(filter).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  public async deleteMany(input: FindUsersInput): Promise<number> {
    const filter = UserQueryBuilder.findUsersQuery(input);
    return (await this.userEntity.deleteMany(filter)).deletedCount;
  }
}

type CreateUserInput = {
  email: string;
  password: string;
  role?: UserRoles;
};

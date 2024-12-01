import { UserEntity } from '../entities/user.entity';

import { User } from '#user/domain/models';

export class UserMapper {
  public static mapEntityToModel(entity: UserEntity): User {
    return {
      id: entity._id.toString(),
      email: entity.email,
      password: entity.password,
      role: entity.role,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}

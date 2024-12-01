import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUserQuery } from './find-user.query';

import { User } from '#user/domain/models';
import { UserQueryRepository } from '#user/infrastructure/repositories';

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery, User> {
  public constructor(private readonly userRepository: UserQueryRepository) {}

  public async execute(query: FindUserQuery): Promise<User> {
    return this.userRepository.findOneOrThrow(query.input);
  }
}

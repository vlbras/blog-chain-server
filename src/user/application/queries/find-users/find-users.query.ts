export class FindUsersQuery {
  public constructor(public readonly input: FindUsersQueryInput) {}
}

type FindUsersQueryInput = {
  ids?: string[];
};

import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseModel, UserRoles } from '#common';

export class UserModel extends BaseResponseModel {
  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;

  @ApiProperty({ enum: UserRoles, default: UserRoles.CUSTOMER })
  public readonly role: UserRoles;
}

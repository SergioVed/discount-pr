import { User } from 'src/core/entities/User/User';
import { UserResponseMapper } from '../../user/mapper/UserResponseMapper';

type AuthTokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthResponseMapper {
  static toLoginResponse(candidate: User, tokens: AuthTokensResponse) {
    return {
      candidate: UserResponseMapper.toResponse(candidate),
      tokens,
    };
  }

  static toRegisterResponse(user: User, tokens: AuthTokensResponse) {
    return {
      user: UserResponseMapper.toResponse(user),
      tokens,
    };
  }
}

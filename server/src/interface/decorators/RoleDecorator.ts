import { SetMetadata } from '@nestjs/common';

export const RolesDecoratorKey = 'roles_decorator';

export const Roles = (...roles: string[]) => {
  return SetMetadata(RolesDecoratorKey, roles);
};

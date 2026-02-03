import { SetMetadata } from "@nestjs/common"

export const role_key = "roles"

export const RoleDecorator = (...roles: string[]) => SetMetadata(role_key, roles)
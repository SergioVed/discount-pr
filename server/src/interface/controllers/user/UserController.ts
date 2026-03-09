import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/core/services/UserService/UserService';
import { Roles } from '../../decorators/RoleDecorator';
import { RoleGuard } from '../../guards/RoleGuard';
import { AuthGuard } from '../../guards/AuthGuard';
import { IsActivated } from '../../guards/IsActivatedGuard';
import { UserResponseMapper } from './mapper/UserResponseMapper';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Put('/:id')
  async activateUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.activateUser(id);
    return UserResponseMapper.toResponse(user);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users.map((user) => UserResponseMapper.toResponse(user));
  }
}

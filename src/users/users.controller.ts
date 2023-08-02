import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/typescript/dtos/update-user-dto';
import { UserDto } from 'src/typescript/dtos/user.dto';
import { Serialize } from 'src/interceptors/serializer.interceptor';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup') // POST /auth/signup
  async signupUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Post('signin') // POST /auth/signin
  signInUser() {}

  @Get('/:id') // GET /auth/:id
  async getSingleUser(@Param('id') id: number) {
    return await this.userService.findOneUser(id);
  }

  @Get('/:id') // GET /auth/?query_param
  async getByQueryParam(@Query('email') email: string) {
    return await this.userService.findUsersByQuery(email);
  }

  @Delete('/:id') // DELETE /auth/:id
  async deleteUser(@Param('id') id: number) {
    return await this.userService.removeUser(id);
  }

  @Patch('/:id') // PATCH /auth/:id
  async editUser(
    @Param('id') id: number,
    @Body() body: Partial<UpdateUserDto>,
  ) {
    return await this.userService.editUser(id, body);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/typescript/dtos/update-user-dto';
import { UserDto } from 'src/typescript/dtos/user.dto';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { CurrentUserDecorator } from 'src/decorators/current-user.decorator';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('whoami') // Get /auth/whoami
  @UseGuards(AuthGuard)
  whoAmi(@CurrentUserDecorator() user: User, @Session() session: any) {
    return user;
  }

  @Post('signout')
  signOutUser(@Session() session: any) {
    session.userId = null;
  }

  @Post('signup') // POST /auth/signup
  async signupUser(@Body() body: CreateUserDto, @Session() session: any) {
    const createdUser = await this.authService.signUp(body);

    // session.userId = createdUser.id;
    return createdUser;
  }

  @Post('signin') // POST /auth/signin
  async signInUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body);

    session.userId = user.id;
    return user;
  }

  @Get('/:id') // GET /auth/:id
  async getSingleUser(@Param('id') id: number) {
    return await this.userService.findOneUser({ id });
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

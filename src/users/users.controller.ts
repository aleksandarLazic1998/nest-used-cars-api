import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('signup') // POST /auth/signup
  async signupUser(@Body() body: CreateUserDto) {
    return await this.service.createUser(body);
  }
}

// POST /auth/signin
// GET /auth/:id - fetch single user
// GET /auth?email="some mail" - fetch list users by email query param
// DELETE /auth/:id
// PATCH /auth/:id - edit user credentials

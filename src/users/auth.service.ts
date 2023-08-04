import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { UsersService } from './users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(body: CreateUserDto): Promise<User> {
    const users = await this.usersService.findOneUser({ email: body.email });

    if (users) {
      throw new BadRequestException('email in use');
    }

    const createdUser = await this.usersService.generate(body);

    if (!createdUser) {
      throw new BadRequestException('Body is missing some parameters.');
    }

    return createdUser;
  }

  async signIn(body: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOneUser({ email: body.email });

    if (!user) {
      throw new NotFoundException(
        `User with id or email: ${user.id || user.email} not found.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `User with email or password are not matching.`,
      );
    }

    const isPasswordMatching = await compare(body.password, user.password);

    if (!isPasswordMatching) {
      throw new NotFoundException(
        `User with email or password are not matching.`,
      );
    }

    return user;
  }
}

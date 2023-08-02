import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(body: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create(body);

    if (!createdUser) {
      throw new BadRequestException('Body is missing some parameters.');
    }

    return this.userRepository.save(createdUser);
  }

  signInUser() {}

  findOneUser(id: number) {}

  findUsersByQuery() {}

  removeUser(id: number) {}

  editUser(id: number) {}
}

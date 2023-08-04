import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/typescript/dtos/update-user-dto';
import { IFindUser } from 'src/typescript/interfaces/FindUser';

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

  async findOneUser({ id, email }: IFindUser): Promise<User> {
    const query: IFindUser = {};

    if (id) query.id = id;
    if (email) query.email = email;

    const foundUser = await this.userRepository.findOneBy(query);

    if (!foundUser) {
      throw new NotFoundException(
        `User with id or email: ${id || email} not found.`,
      );
    }

    return foundUser;
  }

  async findUsersByQuery(query: string): Promise<User[]> {
    const foundUsers = await this.userRepository.find({
      where: { email: query },
    });

    if (foundUsers.length === 0) {
      throw new NotFoundException(`There are no matching users`);
    }

    return foundUsers;
  }

  async removeUser(id: number) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return this.userRepository.remove(foundUser);
  }

  async editUser(
    id: number,
    body: Partial<UpdateUserDto>,
  ): Promise<UpdateResult> {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return this.userRepository.update(foundUser, body);
  }
}

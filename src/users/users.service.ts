import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from 'src/typescript/dtos/create-user-dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/typescript/dtos/update-user-dto';
import { IFindUser } from 'src/typescript/interfaces/FindUser';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generate(body: CreateUserDto): Promise<User> {
    const { email, password } = body;

    const hashedPassword = await hash(password, 10);

    const createdUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

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
    const user = await this.findOneUser({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.userRepository.update(id, { ...user, ...body });
  }
}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import userTypeOrmModuleConfig from './userDBConfig';

@Module({
  imports: [userTypeOrmModuleConfig],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

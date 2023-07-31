import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [UsersModule, RepositoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

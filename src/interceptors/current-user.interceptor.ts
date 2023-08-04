import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';
import IClassConstructor from 'src/typescript/interfaces/ClassConstructor';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    // This will run before request and developer can intercept it.

    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      const foundUser = await this.userService.findOneUser({ id: +userId });
      request.currentUser = foundUser || {};
    }

    return next.handle();
  }
}

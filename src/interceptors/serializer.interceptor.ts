import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import IClassConstructor from 'src/typescript/interfaces/ClassConstructor';

const Serialize = (dto: IClassConstructor) => {
  return UseInterceptors(new InterceptorSerializer(dto));
};

class InterceptorSerializer implements NestInterceptor<IClassConstructor> {
  constructor(private dto: IClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<{}> {
    // This will run before request and developer can intercept it.

    return next.handle().pipe(
      map((data: IClassConstructor) => {
        // This will run before response and developer can intercept it.

        return plainToClass(this.dto, data, {
          // This flags means to remove any attributes that are not @Expose in DTO object
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export { InterceptorSerializer, Serialize };

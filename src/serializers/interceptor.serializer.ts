import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

const Serialize = <T>(dto: T) => {
  return UseInterceptors(new InterceptorSerializer(dto));
};

class InterceptorSerializer implements NestInterceptor {
  constructor(private dto: T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // This will run before request and developer can intercept it.

    return next.handle().pipe(
      map((data: any) => {
        // This will run before response and developer can intercept it.

        return data;
      }),
    );
  }
}

export { Serialize, InterceptorSerializer };

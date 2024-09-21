import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenerateHumanReadableIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Check if the request body has a humanReadableId; if not, generate one
    if (request.body && !request.body.humanReadableId) {
      request.body.humanReadableId = uuidv4();
    }

    return next.handle().pipe(map(data => data));
  }
}

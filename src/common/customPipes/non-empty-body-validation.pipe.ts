import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NonEmptyBodyValidationPipe implements PipeTransform {
  transform(value: any) {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      throw new BadRequestException('Request body must not be empty');
    }
    return value;
  }
}

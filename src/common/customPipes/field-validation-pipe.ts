import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomFieldValidationPipe implements PipeTransform {
  constructor(
    private readonly fieldName: string,
    private readonly errorMessage: string,
  ) {}

  transform(value: any) {
    if (!value[this.fieldName]) {
      throw new BadRequestException(this.errorMessage);
    }
    return value;
  }
}

import { Module } from '@nestjs/common';
import { NonEmptyBodyValidationPipe } from './non-empty-body-validation.pipe';

@Module({
  providers: [NonEmptyBodyValidationPipe],
  exports: [NonEmptyBodyValidationPipe],
})
export class CustomPipesModule {}

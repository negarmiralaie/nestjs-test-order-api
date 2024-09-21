import { Module } from '@nestjs/common';
import { UserAlreadyExistsException } from './user-already-exists.exception';

@Module({
  providers: [UserAlreadyExistsException],
  exports: [UserAlreadyExistsException],
})
export class CustomExceptionsModule {}

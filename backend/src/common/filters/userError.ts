import { HttpException } from '@nestjs/common';

export class UserError extends HttpException {
  constructor(response: string, status: number = 400) {
    super(new Error(response), status);
  }
}

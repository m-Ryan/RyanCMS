import { HttpException } from '@nestjs/common';

export class UserError extends HttpException {
	constructor(response: string, status: number = 500) {
		super(new Error(response), status);
	}
}

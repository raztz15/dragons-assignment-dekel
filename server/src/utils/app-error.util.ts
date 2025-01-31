import { HttpCode, ICommonResponseDict } from './common-response-dict.util';

export class AppError extends Error {
	public readonly title: string;
	public readonly httpCode: HttpCode;
	public readonly isOperational: boolean;

	constructor(commonBase: ICommonResponseDict, message: string, isOperational: boolean) {
		super(message);

		this.title = commonBase.title;
		this.httpCode = commonBase.code;
		this.isOperational = isOperational; // this error is predictable

		Error.captureStackTrace(this);
	}
}

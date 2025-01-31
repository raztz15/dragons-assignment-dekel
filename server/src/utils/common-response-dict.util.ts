export type HttpCode = 200 | 201 | 300 | 400 | 401 | 403 | 404 | 500;

export type ICommonResponseDict = {
	title: string;
	code: HttpCode;
}

class CommonResponseDict {
	static readonly ResourceNotFound: ICommonResponseDict = {
		title: 'Resource not found.',
		code: 404,
	};

	static readonly BadRequest: ICommonResponseDict = {
		title: 'Bad request.',
		code: 400,
	};

	static readonly Unauthorized: ICommonResponseDict = {
		title: 'Unauthorized.',
		code: 401,
	};

	static readonly Forbidden: ICommonResponseDict = {
		title: 'Forbidden.',
		code: 403,
	};

	static readonly InternalServerError: ICommonResponseDict = {
		title: 'Internal server error.',
		code: 500,
	};

	static readonly Success: ICommonResponseDict = {
		title: 'Success',
		code: 200,
	};

	static readonly Created: ICommonResponseDict = {
		title: 'Resource created successfully',
		code: 201,
	};

	static readonly MultipleChoices: ICommonResponseDict = {
		title: 'Multiple choices.',
		code: 300,
	};

	static readonly SchemaError: ICommonResponseDict = {
		title: 'Schema validation error.',
		code: 400,
	};
}

export default CommonResponseDict;

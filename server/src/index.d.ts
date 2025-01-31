export {};

declare global {
	namespace Express {
		interface Request {
			// An example of use
			originUrl: string;
		}
	}
}

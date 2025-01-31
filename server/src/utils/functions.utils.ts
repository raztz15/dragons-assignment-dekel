import fs from 'fs';
import { randomInt } from 'crypto';

// TODO - example of common function
export function generateRandomDigitsCode(length: number): string {
	return randomInt(10 ** (length - 1), 10 ** length - 1).toString();
}

import { PORT } from "../utils/environment-variables";

export class AppConfig {
	static readonly port = PORT ?? 3000;

	static readonly apiUrl = {
		health: '/health',
		orders: '/api/orders',
	};
}

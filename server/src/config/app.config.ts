export class AppConfig {
	static readonly port = process.env.PORT ?? 3000;

	static readonly apiUrl = {
		health: '/health',
		orders: '/api/orders',
	};
}

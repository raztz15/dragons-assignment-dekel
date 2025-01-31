import { Router } from 'express';
import orderRoutes from './orders.route';
import { AppConfig } from '../config/app.config';

const indexRoute = Router();

indexRoute.use(AppConfig.apiUrl.orders, orderRoutes);

export default indexRoute;

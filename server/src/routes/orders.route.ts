import { Router } from 'express';
import { getOrderById, getOrders, updateOrderStatus } from '../controllers/order.controller';

const orderRoutes = Router();

// Route to get all orders
orderRoutes.get('/', getOrders);

// Route to get one order
orderRoutes.get('/:id', getOrderById);

// Route to update order status
orderRoutes.put('/:id/status', updateOrderStatus)

export default orderRoutes;

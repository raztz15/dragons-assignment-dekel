import { Request, Response } from "express";
import { OrderModel, OrderStatus } from "../models/order.model";

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 50
        const skip = (page - 1) * limit

        const sortBy = req.query.sortBy as string || '_id'
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1
        const customerName = req.query.customerName as string || '';

        let filter: any = {}

        if (customerName) {
            filter.customerName = { $regex: customerName, $options: 'i' }
        }

        filter.status = { $ne: 'Delivered' };

        const orders = await OrderModel.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .select("-__v");

        const totalOrders = await OrderModel.countDocuments(filter)

        res.status(200).json({
            orders,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error })
    }
}

//  Get order by id
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const order = await OrderModel.findById(id)
        if (!order) {
            res.status(404).json({ message: 'Order not found' })
        }

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: 'Could not fetch order', error })
    }
}

// Update error status
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status } = req.body

        // Ensure status is a valid enum value
        const validStatus = ["Received", "Preparing", "Ready", "EnRoute", "Delivered"];
        if (!validStatus.includes(status)) {
            res.status(400).json({ message: 'Invalid order status' })
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found" })
        }

        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({ message: "Could not update order", error })
    }
}
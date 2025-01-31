import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";

// Get all orders
export const getOrders = async (_: Request, res: Response) => {

    try {
        const orders = await OrderModel.find().select("-__v");
        res.status(200).json(orders)
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
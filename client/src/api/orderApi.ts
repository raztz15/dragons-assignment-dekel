import axios from 'axios'

const API_BASE_URL = "http://localhost:3000/api/orders";

// Fetch all orders
export const fetchOrders = async (page: number, sortBy: string, sortOrder: string, customerName: string) => {
    try {
        const res = await axios.get(API_BASE_URL, {
            params: { page, sortBy, sortOrder, customerName }
        })
        return res.data
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []
    }
}

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {

    try {
        await axios.put(`${API_BASE_URL}/${orderId}/status`, { status })
    } catch (error) {
        console.error("Error updating order status:", error);
    }
}
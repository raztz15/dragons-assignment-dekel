import { fetchOrders } from "@src/api/orderApi";
import { useEffect, useState } from "react";

const mockOrders = [
    { id: "1", title: "Order #1", status: "Preparing" },
    { id: "2", title: "Order #2", status: "Ready" },
    { id: "3", title: "Order #3", status: "EnRoute" },
]

export const useOrders = (pollingInterval = 5000) => {
    const [orders, setOrders] = useState(mockOrders);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true

        const loadOrders = async () => {
            const data = await fetchOrders()
            if (isMounted) {
                setOrders(data)
                setLoading(false)
            }
        }

        loadOrders()

        // const interval = setInterval(loadOrders, pollingInterval);

        // return () => {
        //     isMounted = false
        //     clearInterval(interval)
        // }
    }, [pollingInterval])

    return { orders, loading }
}
import { Alert, Box, LinearProgress, List, Paper, Typography } from '@mui/material'
import { OrderItem } from './OrderItem'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/store';
import { useEffect, useMemo, useState } from 'react';
import { fetchOrdersAsync } from '@src/store/slices/order/orderSlice';
import { SortFilter } from './SortFilter';

export const OrdersList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { orders, loading, error } = useSelector((state: RootState) => state.orders)

    const [sortBy, setSortBy] = useState('_id');

    useEffect(() => {
        dispatch(fetchOrdersAsync())
        const interval = setInterval(() => dispatch(fetchOrdersAsync()), 5000)
        return () => clearInterval(interval)
    }, [dispatch])

    const activeOrders = orders.filter(order => order.status !== 'Delivered')

    const sortedOrders = useMemo(() => {
        return [...activeOrders].sort((a, b) => {
            switch (sortBy) {
                case '_id':
                    return a._id.localeCompare(b._id)
                case 'time':
                    return new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime();
                case 'status':
                    return a.status.localeCompare(b.status)
                case 'totalPrice':
                    if (a.totalPrice && b.totalPrice) {
                        return a.totalPrice - b.totalPrice
                    }
                    return 0
                default:
                    return 0
            }
        });
    }, [activeOrders, sortBy]);


    return (
        <Paper sx={{ p: 2, height: "80vh", display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Active Orders
            </Typography>

            {/* Sorting Dropdown */}
            <Box sx={{ mb: 2 }}>
                <SortFilter onSortChange={setSortBy} />
            </Box>

            {loading && orders.length === 0 ? (
                <LinearProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : activeOrders.length === 0 ? (
                <Typography>No active orders.</Typography>
            ) : (
                <Paper
                    variant="outlined"
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        maxHeight: "70vh",
                        p: 1,
                        borderRadius: "8px",
                    }}
                >
                    <List>
                        {sortedOrders.map((order) => (
                            <OrderItem key={order._id} {...order} />
                        ))}
                    </List>
                </Paper>
            )}
        </Paper>

    )
}

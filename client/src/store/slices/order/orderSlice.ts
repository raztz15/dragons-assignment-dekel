import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrders, updateOrderStatus } from '@src/api/orderApi';
import { RootState } from '@src/store';

export enum OrderStatus {
  Recieved = "Recieved",
  Preparing = "Preparing",
  Ready = "Ready",
  EnRoute = "EnRoute",
  Delivered = "Delivered"
}

export interface IOrder {
  _id: string;
  title: string;
  orderLocation: { lat: number; lng: number };
  orderTime: string;
  status: OrderStatus;
  subItems: { title: string; amount: number; type: string }[];
  customerName?: string;
  totalPrice?: number;
  lastUpdated: Date;
}

interface IOrdersState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: IOrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const lastFetchedOrders = state.orders.orders

      const newOrders: IOrder[] = await fetchOrders()

      const isDifferent = newOrders.some(
        (newOrder) =>
          !lastFetchedOrders.some(
            oldOrder => oldOrder._id === newOrder._id && oldOrder.lastUpdated === newOrder.lastUpdated
          )
      )
      return isDifferent ? newOrders : lastFetchedOrders
    } catch (error: unknown) {
      return rejectWithValue((error as { message: string }).message || "Failed to fetch orders")
    }
  })

export const updateOrderStatusAsync = createAsyncThunk("orders/updateOrderStatus", async ({ orderId, status }: { orderId: string, status: OrderStatus }, { rejectWithValue }) => {
  try {
    await updateOrderStatus(orderId, status)
    return { orderId, status }
  } catch (error: unknown) {
    return rejectWithValue((error as { message: string }).message || "Failed to update order status")
  }
})

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        if (state.orders.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatusAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const order = state.orders.find((o) => o._id === orderId);
        if (order) order.status = status;
      });
  },
});

export const orderReducer = ordersSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrders, updateOrderStatus } from '@src/api/orderApi';
import { RootState } from '@src/store';

export enum OrderStatus {
  Received = "Received",
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
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  sortBy: string;
  sortOrder: string;
  customerName: string;
  loading: boolean;
  error: string | null;
}

const initialState: IOrdersState = {
  orders: [],
  totalOrders: 0,
  totalPages: 1,
  currentPage: 1,
  sortBy: '_id',
  sortOrder: 'asc',
  customerName: '',
  loading: false,
  error: null
};

export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page, sortBy = '_id', sortOrder = 'asc', customerName = '' }: { page: number, sortBy?: string, sortOrder?: string, customerName?: string }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState

      const lastFetchedOrders = state.orders.orders

      const response = await fetchOrders(page, sortBy, sortOrder, customerName)
      const newOrders: IOrder[] = response.orders

      const isDifferent = newOrders.some(
        (newOrder) =>
          !lastFetchedOrders.some(
            oldOrder => oldOrder._id === newOrder._id && oldOrder.lastUpdated === newOrder.lastUpdated
          )
      )

      return isDifferent ? response : lastFetchedOrders
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
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    sortOrders: (state, action) => {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
      state.orders = []
      state.currentPage = 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        if (state.orders.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders
        state.totalPages = action.payload.totalPages
        state.loading = false;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.error = null
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

export const { setPage, sortOrders } = ordersSlice.actions
export const orderReducer = ordersSlice.reducer;

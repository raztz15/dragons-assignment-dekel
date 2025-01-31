import mongoose, { Schema, Types } from 'mongoose';

export enum OrderStatus {
	Recieved = "Recieved",
	Preparing = "Preparing",
	Ready = "Ready",
	EnRoute = "EnRoute",
	Delivered = "Delivered"
}

interface ISubItem {
	title: string;
	amount: number;
	type: string; // e.g., "Pizza", "Salad"
}

export interface IOrderModel extends Document {
	title: string;
	orderLocation: {
		lat: number;
		lng: number;
	};
	orderTime: Date;
	status: OrderStatus;
	subItems: ISubItem[];
	customerName?: string;
	totalPrice?: number;
	lastUpdated: Date;
}

const subItemSchema = new Schema<ISubItem>({
	title: { type: String, required: true },
	amount: { type: Number, required: true },
	type: { type: String, required: true } // e.g., "Pizza", "Salad"
});

const orderSchema = new Schema<IOrderModel>(
	{
		title: { type: String, required: true },
		orderLocation: {
			lng: { type: Number, required: true },
			lat: { type: Number, required: true },
		},
		orderTime: { type: Date, default: Date.now },
		status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Recieved },
		subItems: [subItemSchema],
		customerName: { type: String },
		totalPrice: { type: Number },
		lastUpdated: { type: Date, default: Date.now }
	},
	{
		timestamps: true,
	},
);

orderSchema.pre("findOneAndUpdate", function (next) {
	this.set({ lastUpdated: new Date() });
	next();
});

export const OrderModel = mongoose.model<IOrderModel>('Order', orderSchema);

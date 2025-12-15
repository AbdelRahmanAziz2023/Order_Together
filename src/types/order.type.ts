
import { CartItemDto } from "./cart.type";

export type OrderRole = "HOST" | "PARTICIPANT";
export type OrderStatus = "PAID" | "UNPAID" | "COMPLETED" | "PENDING";

export interface OrderHistoryItem {
	orderId: string; // uuid
	restaurantName: string;
	restaurantLogoUrl: string|null;
	completedAt: Date; 
	isHost: boolean;
	status: OrderStatus;
	myTotal: number;
}

export interface BillResponse {
	restaurantName: string;
	restaurantLogoUrl: string | null;
	orderTime: string;
	hostName: string;
	paymentInstructions?: string | null;
	isPaid: boolean;
	subTotal: number;
	sharedFee: number;
	totalDue: number;
	items: CartItemDto[];
}

export interface TrackerParticipant {
	userId: string; // uuid
	name: string;
	amountOwed: number;
	isPaid: boolean;
	isHost: boolean;
}

export interface TrackerResponse {
	orderTotal: number;
	collectedAmount: number;
	remainingAmount: number;
	paymentInstructions?: string | null;
	participants: TrackerParticipant[];
}


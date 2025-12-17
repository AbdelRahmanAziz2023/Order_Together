import { CartItemDto } from "./cart.type";

export type OrderRole = "HOST" | "PARTICIPANT";
export type OrderStatus =
  | "PAID"
  | "UNPAID"
  | "COMPLETED"
  | "PENDING_COLLECTION";

export interface OrderHistoryItem {
  orderId: string; // uuid
  restaurantName: string;
  restaurantLogoUrl: string | null;
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
  userName: string;
  avatarUrl: string | null;
  total: number;
  isPaid: boolean;
  isHost: boolean;
}

export interface TrackerResponse {
  hostUserId: string; // uuid
  orderTotal: number;
  collectedAmount: number;
  remainingAmount: number;
  completedAt: Date;
  paymentInstructions?: string | null;
  restaurantName: string;
  restaurantLogoUrl: string | null;
  participants: TrackerParticipant[];
}

export interface PlaceOrderRequest {
  orderSessionId: string;
  paymentInstructions: string;
  deliveryFee: number;
}

export interface PlaceOrderResponse {}

export interface CartRestaurant {
  id: string | number;
  name: string;
  image: string;
  hostedBy: string;
}

export interface ActiveCartData {
  cartId: string;
  restaurant: CartRestaurant;
  totalPrice: number;
  participantsCount: number;
  status: "opened" | "closed" | "pending";
}

export interface CartStateResponseData {
  cartId: string;
  joinCode: string;
  restaurantName: string;
  restaurantShortCode: string;
  restaurantLogoUrl: string;
}

export interface CartStateResponse {
  mode: "CREATOR" | "HOST" | "MEMBER" | "SPECTOR";
  cartSummary: CartStateResponseData | null;
  conflictInfo: CartStateResponseData | null;
}

export interface CreateCartResponse {
  cartId: string;
  joinCode: string;
  message: string;
}

export interface ActiveCartResponse {
  cartId: string;
  restaurantName: string;
  restaurantLogoUrl: string;
  restaurantShortCode: string;
  isLocked: boolean;
  isHost: boolean;
  hostName: string;
  participantCount: number;
  personalSubTotal: number;
}

export interface CartItemDto {
  orderItemId: string;
  menuItemId: string;
  name: string;
  price: number;
  qty: number;
  note: string | null;
}

export interface CartSummaryUser {
  userId: string;
  name: string;
  isHost: boolean;
  subtotal: number;
  items: CartItemDto[];
}

export interface CartSummaryResponse {
  cartId: string;
  hostId: string;
  status: "OPEN" | "LOCKED";
  deliveryFee: number;
  users: CartSummaryUser[];
}

export interface PreviewCartResponse {
  cartId: string;
  restaurantShortCode: string;
  status: "OPEN" | "LOCKED";
}

export interface JoinCartResponse {
  cartId: string;
  message: string;
}

// Request body Interfaces
export interface CartStateRequest {
  cartId: string | null;
  restaurantShortCode: string;
}

export interface CreateCartRequest {
  menuItemId: string;
  quantity: number;
  note: string;
}

export interface JoinCartRequest {
  cartId: string;
  intitailItem: {
    menuItemId: string;
    qty: number;
    note?: string;
  };
}

export interface PreviewCartRequest {
  joinCode: string;
}

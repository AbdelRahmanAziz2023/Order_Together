import {
  ActiveCartResponse,
  CartStateRequest,
  CartStateResponse,
  CartSummaryResponse,
  CreateCartRequest,
  CreateCartResponse,
  JoinCartResponse,
  PreviewCartRequest,
  PreviewCartResponse,
} from "../../../types/cart.type";
import { baseApi } from "../baseApi";

interface JoinCartRequest {
  joinCode: string;
}

const CartEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartState: builder.query<CartStateResponse, CartStateRequest>({
      query: (body) => ({
        url: "cart/state",
        method: "GET",
        body,
      }),
    }),
    getCartSummary: builder.query<CartSummaryResponse, string>({
      query: (cartId) => ({
        url: `cart/${cartId}/summary`,
      }),
    }),
    getActiveCart: builder.query<
      ActiveCartResponse & { isNoContent: boolean },void>({
      query: () => ({
        url: "cart/active",
        responseHandler: (response) =>
          response.status === 204 ? null : response.json(),
      }),
      transformResponse: (response: ActiveCartResponse | null) => {
        if (response === null) {
          return { isNoContent: true } as ActiveCartResponse & {
            isNoContent: boolean;
          };
        }
        return { ...response, isNoContent: false };
      }
    }),

    createCart: builder.mutation<CreateCartResponse, CreateCartRequest>({
      query: (body) => ({
        url: "cart/create",
        method: "POST",
        body,
      }),
    }),
    cartPreview: builder.mutation<PreviewCartResponse, PreviewCartRequest>({
      query: (body) => ({
        url: "cart/preview",
        method: "POST",
        body,
      }),
    }),
    joinCart: builder.mutation<JoinCartResponse, JoinCartRequest>({
      query: (body) => ({
        url: "cart/join",
        method: "POST",
        body,
      }),
    }),
    leaveCart: builder.mutation<void, void>({
      query: () => ({
        url: "cart/leave",
        method: "POST",
      }),
    }),
    deleteCart: builder.mutation<void, string>({
      query: (cardId) => ({
        url: `cart/${cardId}`,
        method: "DELETE",
      }),
    }),
    lockCart: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `cart/${cartId}/lock`,
        method: "POST",
      }),
    }),
    unlockCart: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `cart/${cartId}/unlock`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCartStateQuery,
  useGetCartSummaryQuery,
  useGetActiveCartQuery,
  useCreateCartMutation,
  useCartPreviewMutation,
  useJoinCartMutation,
  useLeaveCartMutation,
  useDeleteCartMutation,
  useLockCartMutation,
  useUnlockCartMutation,
} = CartEndpoints;

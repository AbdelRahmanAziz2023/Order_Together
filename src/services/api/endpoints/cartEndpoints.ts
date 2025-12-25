import {
  ActiveCartResponse,
  CartStateRequest,
  CartStateResponse,
  CartSummaryResponse,
  CreateCartRequest,
  CreateCartResponse,
  JoinCartRequest,
  JoinCartResponse,
  PreviewCartRequest,
  PreviewCartResponse,
} from "../../../types/cart.type";
import { baseApi } from "../baseApi";

const CartEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartState: builder.mutation<CartStateResponse, CartStateRequest>({
      query: (body) => ({
        url: "cart/state",
        method: "POST",
        body,
      }),
      // providesTags: ["CartState"],
    }),

    getCartSummary: builder.query<CartSummaryResponse, string>({
      query: (cartId) => ({
        url: `cart/${cartId}/summary`,
      }),
    }),
    getActiveCart: builder.query<
      ActiveCartResponse & { isNoContent: boolean },
      void
    >({
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
      },
      providesTags: ["ActiveCart"],
    }),

    createCart: builder.mutation<CreateCartResponse, CreateCartRequest>({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    cartPreview: builder.mutation<PreviewCartResponse, PreviewCartRequest>({
      query: (body) => ({
        url: "cart/preview",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    joinCart: builder.mutation<JoinCartResponse, JoinCartRequest>({
      query: (body) => ({
        url: "cart/join",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    leaveCart: builder.mutation<void, void>({
      query: () => ({
        url: "cart/leave",
        method: "POST",
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    deleteCart: builder.mutation<void, string>({
      query: (cardId) => ({
        url: `cart/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    lockCart: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `cart/${cartId}/lock`,
        method: "POST",
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    unlockCart: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `cart/${cartId}/unlock`,
        method: "POST",
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
  }),
});

export const {
  useGetCartStateMutation,
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

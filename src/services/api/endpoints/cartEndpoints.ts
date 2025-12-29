import {
  ActiveCartResponse,
  CartStateRequest,
  CartStateResponse,
  CreateCartRequest,
  CreateCartResponse,
  PreviewCartRequest,
  PreviewCartResponse
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
      keepUnusedDataFor: 5,
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
      // invalidatesTags: ["ActiveCart", "CartState"],
    }),
    deleteCart: builder.mutation<void, void>({
      query: () => ({
        url: `cart`,
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
    addItemToCart: builder.mutation<
      any,
      { cartID: string; item: CreateCartRequest }
    >({
      query: ({ cartID, item: body }) => ({
        url: `cart/${cartID}/items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    editItemInCart: builder.mutation<any, any>({
      query: ({ cartId, orderItemId, body }) => ({
        url: `cart/${cartId}/items/${orderItemId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
    deleteItemFromCart: builder.mutation<any, any>({
      query: ({ cartId, orderItemId }) => ({
        url: `cart/${cartId}/items/${orderItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ActiveCart", "CartState"],
    }),
  }),
});

export const {
  useGetCartStateMutation,
  useGetActiveCartQuery,
  useCreateCartMutation,
  useCartPreviewMutation,
  useDeleteCartMutation,
  useLockCartMutation,
  useUnlockCartMutation,
  useAddItemToCartMutation,
  useEditItemInCartMutation,
  useDeleteItemFromCartMutation,
} = CartEndpoints;

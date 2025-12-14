import { baseApi } from "../baseApi";

const CartItemEndpoint = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addItemToCart: builder.mutation({
      query: (item) => ({
        url: "cart/items",
        method: "POST",
        body: item,
      }),
    }),
    updateItemInCart: builder.mutation({
      query: (item) => ({
        url: `cart/items/${item.id}`,
        method: "PUT",
        body: item,
      }),
    }),
    removeItemFromCart: builder.mutation<string, string>({
      query: (id) => ({
        url: `cart/items/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useUpdateItemInCartMutation,
  useRemoveItemFromCartMutation,
} = CartItemEndpoint;

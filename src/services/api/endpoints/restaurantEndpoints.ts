import baseApi from "../baseApi";

export interface Restaurant {
  id: number;
  name: string;
}

export interface MenuItem {
  itemID: number;
  restaurantID: number;
  name: string;
  price: number;
  allowCustomization: boolean;
  isActive: boolean;
}

const RestaurantEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => ({
        url: "restaurants",
        method: "GET",
      }),
    }),
    getRestaurantMenu: builder.query<MenuItem[], number>({
      query: (restaurantId) => ({
        url: `restaurants/${restaurantId}/menu`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetRestaurantMenuQuery } =
  RestaurantEndpoints;

import { MenuResponse, RestaurantDto } from "@/src/types/restaurant.type";
import { baseApi } from "../baseApi";





const RestaurantEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<RestaurantDto[], void>({
      query: () => ({
        url: "restaurants",
        method: "GET",
      }),
    }),
    getRestaurantMenu: builder.query<MenuResponse, string>({
      query: (shortCode) => ({
        url: `restaurants/${shortCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetRestaurantMenuQuery } =
  RestaurantEndpoints;

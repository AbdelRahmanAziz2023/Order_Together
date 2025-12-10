import { RestaurantDto } from "@/src/types/restaurant.type";
import { baseApi } from "../baseApi";



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
    getRestaurants: builder.query<RestaurantDto[], void>({
      query: () => ({
        url: "restaurants",
        method: "GET",
      }),
    }),
    getRestaurantMenu: builder.query<MenuItem[], string>({
      query: (shortCode) => ({
        url: `restaurants/${shortCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetRestaurantMenuQuery } =
  RestaurantEndpoints;

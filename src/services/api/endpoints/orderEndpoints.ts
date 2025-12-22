import { BillResponse, OrderHistoryItem, PlaceOrderRequest, TrackerResponse } from "@/src/types/order.type";
import { baseApi } from "../baseApi";

const OrderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersHistory: builder.query<OrderHistoryItem[],{page: number; limit: number}>({
      query: ({page = 1, limit = 5}) => ({
        url: "/orders/history",
        method: "GET",
        params: { page, limit },
      }),
      // serializeQueryArgs: ({endpointName}) => endpointName,
      // merge: (currentCache, newItems)=>{
      //   currentCache.push(...newItems);
      //   return currentCache
      // }

    }),
    getBill: builder.query<BillResponse,string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/bill`,
        method: "GET",
      }),
      // providesTags:(result,error,arg)=>[
      //     {type:"Bill",id:arg},
      // ],
    }),
    getTracker: builder.query<TrackerResponse,string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/tracker`,
        method: "GET",
      }),
      providesTags:['Tracker'],
    }),
    placeOrder: builder.mutation<any,PlaceOrderRequest>({
      query: (body) => ({
        url: `/orders/place`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ActiveCart"],
    }),
    togglePaidStatus: builder.mutation<{message: string}, { orderId: string; userId: string, body: any }>({
      query: ({ orderId, userId,body }) => ({
        url: `/orders/${orderId}/participants/${userId}/payment`,
        method: "PATCH",
        body,
      }),
     invalidatesTags:['Tracker']
    }),
  }),
});

export const {
  useGetOrdersHistoryQuery,
  useGetBillQuery,
  useGetTrackerQuery,
  usePlaceOrderMutation,
  useTogglePaidStatusMutation,
} = OrderEndpoints;

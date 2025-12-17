import { BillResponse, OrderHistoryItem, PlaceOrderRequest, TrackerResponse } from "@/src/types/order.type";
import { baseApi } from "../baseApi";

const OrderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersHistory: builder.query<OrderHistoryItem[],number>({
      query: (limit = 5) => ({
        url: "/orders/history?limit=" + limit,
        method: "GET",
      }),
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

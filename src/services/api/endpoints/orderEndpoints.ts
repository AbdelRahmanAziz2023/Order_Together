import { BillResponse, OrderHistoryItem, PlaceOrderRequest, TrackerResponse } from "@/src/types/order.type";
import { baseApi } from "../baseApi";

const OrderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersHistory: builder.query<OrderHistoryItem[],{page: number; pageSize: number}>({
      query: ({page, pageSize}) => ({
        url: "/orders/history",
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: ["OrderHistory"],
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
      invalidatesTags: ["ActiveCart", "OrderHistory"],
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

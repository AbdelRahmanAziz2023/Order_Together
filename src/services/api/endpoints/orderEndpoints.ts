import { BillResponse, OrderHistoryItem } from "@/src/types/order.type";
import { baseApi } from "../baseApi";

const OrderEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersHistory: builder.query<OrderHistoryItem[],number>({
      query: (limit = 5) => ({
        url: "/orders/history?limit=" + limit,
        method: "GET",
      }),
      // providesTags:["OrderHistory"],
    }),
    getBill: builder.query<BillResponse,string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      // providesTags:(result,error,arg)=>[
      //     {type:"Bill",id:arg},
      // ],
    }),
    getTracker: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}/tracker`,
        method: "GET",
      }),
      // providesTags:(result,error,arg)=>[
      //     {type:"Tracker",id:arg},
      // ],
    }),
    placeOrder: builder.mutation({
      query: () => ({
        url: `/orders/place`,
        method: "POST",
      }),
      //   invalidatesTags: ["ActiveCart"],
    }),
    togglePaidStatus: builder.mutation({
      query: ({ orderId, userId }) => ({
        url: `/orders/${orderId}/participants/${userId}/payment`,
        method: "PATCH",
      }),
      //   invalidatesTags:(result,error,arg)=>[
      //       {type:"Tracker",id:arg},
      //   ],
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

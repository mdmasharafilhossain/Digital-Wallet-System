import { createApi } from "@reduxjs/toolkit/query/react";
import  baseQuery  from "./baseApi";
import type { AddMoneyRequest, CashInOutRequest, SendMoneyRequest, Wallet } from "../../../types";

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    getWallet: builder.query<Wallet, void>({
  query: () => '/wallet/me',
  transformResponse: (response: { status: string; data: { wallet: Wallet } }) => {
    return response.data.wallet; 
  },
  providesTags: ['Wallet'],
}),

    addMoney: builder.mutation<Wallet, AddMoneyRequest>({
      query: (body) => ({
        url: '/wallet/add-money',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet'],
    }),
    withdrawMoney: builder.mutation<Wallet, AddMoneyRequest>({
      query: (body) => ({
        url: '/wallet/withdraw',
        method: 'POST',
        body,
      }),
       invalidatesTags: ['Wallet'],
    }),
    sendMoney: builder.mutation<void, SendMoneyRequest>({
      query: (body) => ({
        url: '/wallet/send-money',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet'],
    }),
    cashIn: builder.mutation<void, CashInOutRequest>({
      query: (body) => ({
        url: '/wallet/cash-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet'],
    }),
    cashOut: builder.mutation<void, CashInOutRequest>({
      query: (body) => ({
        url: '/wallet/cash-out',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet'],
    }),
  }),
})

export const {
  useGetWalletQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
} = walletApi
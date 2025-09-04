import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import type { Transaction } from "../../../types";

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery,
  endpoints: (builder) => ({
    getMyTransactions: builder.query<Transaction[], { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/transactions/me',
        params,
      }),
    }),
    getAllTransactions: builder.query<{ transactions: Transaction[]; total: number }, { 
      page?: number; 
      limit?: number;
      userId?: string;
      type?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }>({
      query: (params) => ({
        url: '/admin/transactions',
        params,
      }),
    }),
  }),
})


export const {
  useGetMyTransactionsQuery,
  useGetAllTransactionsQuery,
} = transactionApi;
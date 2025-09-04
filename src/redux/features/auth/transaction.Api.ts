// src/redux/features/transaction/transaction.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import type { Transaction } from "../../../types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  endpoints: (builder) => ({




  getMyTransactions: builder.query<{
  transactions: Transaction[];
  total: number;
  totalPages: number;
}, { page?: number; limit?: number; type?: string; startDate?: string; endDate?: string }>({
  query: (params) => ({
    url: '/transactions/me',
    params,
  }),
  transformResponse: (response: {
    status: string;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    results: number;
    data: { transactions: Transaction[] };
  }) => ({
    transactions: response.data.transactions,
    total: response.total,
    totalPages: response.totalPages,
  }),
}),



    getAllTransactions: builder.query<
      { transactions: Transaction[]; total: number },
      {
        page?: number;
        limit?: number;
        userId?: string;
        type?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: (params) => ({
        url: "/admin/transactions",
        params,
      }),
      transformResponse: (response: {
        status: string;
        results: number;
        data: { transactions: Transaction[] };
      }) => {
        return {
          transactions: response.data.transactions,
          total: response.results,
        };
      },
    }),
  }),
});

export const {
  useGetMyTransactionsQuery,
  useGetAllTransactionsQuery,
} = transactionApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import type { PaginationParams, Transaction, User, Wallet } from "../../../types";

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ users: User[]; total: number }, PaginationParams>({
  query: (params) => ({
    url: '/admin/users',
    params,
  }),
  transformResponse: (response: { status: string; results: number; data: { users: User[] } }) => ({
    users: response.data.users,
    total: response.results, // keep total for pagination
  }),
}),


    getAllAgents: builder.query<User[], PaginationParams>({
      query: (params) => ({
        url: '/admin/agents',
        params,
      }),
    }),
    getAllWallets: builder.query<Wallet[], PaginationParams>({
      query: (params) => ({
        url: '/admin/wallets',
        params,
      }),
    }),
    toggleWalletBlock: builder.mutation<Wallet, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/wallets/${id}/block`,
        method: 'PATCH',
      }),
    }),
    toggleAgentApproval: builder.mutation<User, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/agents/${id}/approve`,
        method: 'PATCH',
      }),
    }),
    reverseTransaction: builder.mutation<Transaction, { id: string; note: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/transactions/${id}/reverse`,
        method: 'POST',
        body,
      }),
    }),
    adjustWalletBalance: builder.mutation<Transaction, { 
      userId: string; 
      amount: number; 
      description: string; 
      note: string 
    }>({
      query: (body) => ({
        url: '/admin/wallets/adjust-balance',
        method: 'POST',
        body,
      }),
    }),
     toggleUserBlock: builder.mutation<User, { id: string }>({
  query: ({ id }) => ({
    url: `/admin/users/${id}/block`,
    method: 'PATCH',
  }),
}),
  }),
  
})


export const {
  useGetAllUsersQuery,
  useGetAllAgentsQuery,
  useGetAllWalletsQuery,
  useToggleWalletBlockMutation,
  useToggleAgentApprovalMutation,
  useReverseTransactionMutation,
  useAdjustWalletBalanceMutation,
  useToggleUserBlockMutation
} = adminApi
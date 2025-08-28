import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { 
  User, 
  Wallet, 
  Transaction, 
  LoginRequest, 
  RegisterRequest, 
  AddMoneyRequest, 
  SendMoneyRequest, 
  CashInOutRequest,
  PaginationParams,
  TransactionFilters
} from '../../../types/index';
import type { RootState } from '../../store/store';
// process.env.REACT_APP_API_URL ||
const baseQuery = fetchBaseQuery({
  baseUrl:  'http://localhost:5000/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include', 
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Wallet', 'Transaction'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<{ user: User; token: string }, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<{ user: User }, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // Wallet endpoints
    getWallet: builder.query<Wallet, void>({
      query: () => '/wallet/me',
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
      invalidatesTags: ['Wallet', 'Transaction'],
    }),
    cashIn: builder.mutation<void, CashInOutRequest>({
      query: (body) => ({
        url: '/wallet/cash-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet', 'Transaction'],
    }),
    cashOut: builder.mutation<void, CashInOutRequest>({
      query: (body) => ({
        url: '/wallet/cash-out',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet', 'Transaction'],
    }),

    // Transaction endpoints
    getMyTransactions: builder.query<Transaction[], PaginationParams>({
      query: (params) => ({
        url: '/transactions/me',
        params,
      }),
      providesTags: ['Transaction'],
    }),
    getAllTransactions: builder.query<{ transactions: Transaction[]; total: number }, PaginationParams & TransactionFilters>({
      query: (params) => ({
        url: '/admin/transactions',
        params,
      }),
      providesTags: ['Transaction'],
    }),

    // Admin endpoints
    getAllUsers: builder.query<User[], PaginationParams>({
      query: (params) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: ['User'],
    }),
    getAllAgents: builder.query<User[], PaginationParams>({
      query: (params) => ({
        url: '/admin/agents',
        params,
      }),
      providesTags: ['User'],
    }),
    getAllWallets: builder.query<Wallet[], PaginationParams>({
      query: (params) => ({
        url: '/admin/wallets',
        params,
      }),
      providesTags: ['Wallet'],
    }),
    toggleWalletBlock: builder.mutation<Wallet, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/wallets/${id}/block`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Wallet'],
    }),
    toggleAgentApproval: builder.mutation<User, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/agents/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    reverseTransaction: builder.mutation<Transaction, { id: string; note: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/transactions/${id}/reverse`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transaction'],
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
      invalidatesTags: ['Wallet', 'Transaction'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useGetWalletQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
  useGetMyTransactionsQuery,
  useGetAllTransactionsQuery,
  useGetAllUsersQuery,
  useGetAllAgentsQuery,
  useGetAllWalletsQuery,
  useToggleWalletBlockMutation,
  useToggleAgentApprovalMutation,
  useReverseTransactionMutation,
  useAdjustWalletBalanceMutation,
} = api;
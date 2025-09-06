import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store.authSlice'
import { authApi } from '../features/auth/auth.api';
import { walletApi } from '../features/auth/wallet.api';
import { transactionApi } from '../features/auth/transaction.Api';
import { adminApi } from '../features/auth/admin.api';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(walletApi.middleware)
  .concat(transactionApi.middleware)
  .concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
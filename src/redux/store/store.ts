import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store.authSlice'
import { authApi } from '../features/auth/auth.api';
import { walletApi } from '../features/auth/wallet.api';
import { transactionApi } from '../features/auth/transaction.Api';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(walletApi.middleware)
  .concat(transactionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
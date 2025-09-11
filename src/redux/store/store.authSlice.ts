// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
// import type { User } from '../../types';


// interface AuthState {
//   user: User | null;
//   token?: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   token: Cookies.get('token') || null,
//   isAuthenticated: !!Cookies.get('token'),
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ user: User; token: string  }>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
      
//       Cookies.set('token', action.payload.token, { expires: 7 });
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
      
//       Cookies.remove('token');
//     },
//     updateUser: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { setCredentials, logout, updateUser } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

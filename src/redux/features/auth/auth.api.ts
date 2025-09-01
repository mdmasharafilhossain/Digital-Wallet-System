import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User, LoginRequest, RegisterRequest } from "../../../types/index";
import type { RootState } from "../../store/store";
// process.env.REACT_APP_API_URL ||
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<{ user: User; token: string }, LoginRequest>({
  query: (credentials) => ({
    url: "/auth/login",
    method: "POST",
    body: credentials,
  }),
  transformResponse: (response: { status: string; data: { user: User; token: string } }) => {
    return response.data; 
  },
  invalidatesTags: ["User"],
}),

    register: builder.mutation<void, RegisterRequest>({
  query: (userData) => ({
    url: "/auth/register",
    method: "POST",
    body: userData,
  }),
}),

    getProfile: builder.query<User, void>({
  query: () => "/auth/profile",
  transformResponse: (response: { status: string; data: User }) => response.data, 
  providesTags: ["User"],
}),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;

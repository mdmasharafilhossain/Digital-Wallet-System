import { createApi} from "@reduxjs/toolkit/query/react";
import  baseQuery  from "./baseApi";
import type { User, LoginRequest, RegisterRequest } from "../../../types/index";

// process.env.REACT_APP_API_URL ||


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

updateProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body,
      }),
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
  useUpdateProfileMutation 
} = authApi;

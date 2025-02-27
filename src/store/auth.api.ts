import { api } from "./Api";
import {
  APIError,
  APIResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "./types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<APIResponse<User | APIError>, LoginRequest>({
      query: (body: LoginRequest) => {
        console.log("Requesting Login: ", body);
        return {
          url: "/auth/login",
          method: "POST",
          body,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    register: builder.mutation<APIResponse<User | APIError>, RegisterRequest>({
      query: (body: RegisterRequest) => {
        console.log("Requesting Register: ", body);
        return {
          url: "/auth/register",
          method: "POST",
          body,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    logout: builder.mutation<APIResponse<string | APIError>, void>({
      query: () => {
        console.log("Requesting Logout");
        return {
          url: "/auth/logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),
    checkUser: builder.query<APIResponse<User | APIError>, void>({
      query: () => {
        console.log("Requesting Check User");
        return {
          url: "/auth/checkUser",
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyCheckUserQuery,
  useLogoutMutation,
} = authApi;

import { apiSlice } from "@/lib/features/api/apiSlice";
import { setCookie } from "@/utils/cookie";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ( {
        url: "login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled; 
          console.log(data,"welcome my atonko");
          const { accessToken, refreshToken } = data || {}; 
          setCookie("access", accessToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
          }); // 15 minutes in milliseconds
          setCookie("refresh", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          }); // 24 hours in milliseconds
        //   dispatch(logout(accessToken));
        } catch (error) {}
      },
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled; 
          const { accessToken, refreshToken } = data || {}; 
          setCookie("access", accessToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
          }); // 15 minutes in milliseconds
          setCookie("refresh", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          }); // 24 hours in milliseconds
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;

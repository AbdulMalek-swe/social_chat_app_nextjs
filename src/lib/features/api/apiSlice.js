import { getCookie } from "@/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getAccessToken = () => getCookie('access');
const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    // Retrieve the access token synchronously
    const token = getAccessToken();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
   tagTypes: ["Post"],
  endpoints: (build) => ({}),
});

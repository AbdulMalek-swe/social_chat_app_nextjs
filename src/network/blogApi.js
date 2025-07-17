import { apiSlice } from "@/lib/features/api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
 
  endpoints: (builder) => ({
    getBlog: builder.query({
      query: () => ({
        url: `blog`,
        method: "GET",
      }),
      providesTags: ["Post"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blog",
        method: "POST",
        body: data,
        //
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
});
export const { useGetBlogQuery, useCreateBlogMutation } = blogApiSlice;

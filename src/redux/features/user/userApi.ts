// import { baseApi } from "../api/baseApi";

import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch currently logged-in user's data
    getUserData: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    // get user profile data
    getUserProfileData: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // foooor
    getUserByToken: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      providesTags: ["auth"],
    }),

    // Update user profile (name and image)
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: "/users/me",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetUserProfileDataQuery,
  useGetUserByTokenQuery,
  useUpdateUserProfileMutation,
} = userApi;

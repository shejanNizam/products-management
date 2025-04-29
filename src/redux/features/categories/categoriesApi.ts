import { Category } from "../../../types/product";
import baseApi from "../../api/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get single product
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: `products/categories`,
        method: "GET",
        transformResponse: (response: string[]) =>
          response.map((name) => ({
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
            url: `products/categories/${name
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
          })),
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;

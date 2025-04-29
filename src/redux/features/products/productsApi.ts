import { Product, ProductsResponse } from "../../../types/product";
import baseApi from "../../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getAllProducts: builder.query<
      ProductsResponse,
      { skip?: number; limit?: number }
    >({
      query: ({ skip = 0, limit = 10 }) => ({
        url: `/products?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    // getProductById: builder.query<Product, number>({
    //   query: (id) => `/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Product", id }],
    // }),

    // get single product
    getProductById: builder.query<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    //  add product
    // addProduct: builder.mutation({
    //   query: (data) => ({
    //     url: "/",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["products"],
    // }),

    //  edit product
    updteProductById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    // delete products
    // deleteProductById: builder.mutation({
    //   query: (id) => ({
    //     url: `/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["products"],
    // }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  // useAddProductMutation,
  useUpdteProductByIdMutation,
  // useDeleteProductByIdMutation,
} = productsApi;

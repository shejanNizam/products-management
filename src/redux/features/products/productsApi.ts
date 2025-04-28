import baseApi from "../../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    // get single product
    getProductById: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    //  add product
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

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
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdteProductByIdMutation,
  useDeleteProductByIdMutation,
} = productsApi;

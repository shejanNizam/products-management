import { Button, Card, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/features/products/productsApi";
import { Product } from "../../../types/product";

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetAllProductsQuery({
    skip: (page - 1) * pageSize,
    limit: pageSize,
  });

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="thumbnail"
          style={{ width: 60, height: 60 }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Product) => (
        <Link to={`/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => `${rating}/5`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Product) => (
        <Space size="middle">
          <Link to={`/products/${record.id}`}>
            <Button type="primary">View Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const filteredProducts = data?.products || [];

  return (
    <Card title={"Product List"} style={{ margin: 20 }}>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: data?.total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </Card>
  );
};

export default ProductList;

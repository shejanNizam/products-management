import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  List,
  Rate,
  Row,
  Space,
  Spin,
  Tag,
} from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../redux/features/products/productsApi";
import { Review } from "../../../types/product";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //   console.log("params id ------------->>", id);
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }
  if (isError || !product) return <div>Error loading product</div>;

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={product.title}
        extra={
          <Link to={`/products/${product.id}/edit`}>
            <Button type="primary">Edit Product</Button>
          </Link>
        }
      >
        <Row gutter={16}>
          <Col span={8}>
            <Image.PreviewGroup>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  style={{ marginBottom: 8, width: "100%" }}
                />
              ))}
            </Image.PreviewGroup>
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Description">
                {product.description}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                <Tag color="blue">{product.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                ${product.price.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Discount Percentage">
                {product.discountPercentage}%
              </Descriptions.Item>
              <Descriptions.Item label="Rating">
                <Rate disabled allowHalf defaultValue={product.rating} />
              </Descriptions.Item>
              <Descriptions.Item label="Stock">
                {product.stock}
              </Descriptions.Item>
              <Descriptions.Item label="Brand">
                {product.brand}
              </Descriptions.Item>
              <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
              <Descriptions.Item label="Weight">
                {product.weight} kg
              </Descriptions.Item>
              <Descriptions.Item label="Dimensions">
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth} cm
              </Descriptions.Item>
              <Descriptions.Item label="Warranty">
                {product.warrantyInformation}
              </Descriptions.Item>
              <Descriptions.Item label="Shipping">
                {product.shippingInformation}
              </Descriptions.Item>
              <Descriptions.Item label="Availability">
                {product.availabilityStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Return Policy">
                {product.returnPolicy}
              </Descriptions.Item>
              <Descriptions.Item label="Minimum Order Quantity">
                {product.minimumOrderQuantity}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Reviews</Divider>
            <List
              dataSource={product.reviews}
              renderItem={(review: Review) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <span>{review.reviewerName}</span>
                        <Rate disabled defaultValue={review.rating} />
                      </Space>
                    }
                    description={
                      <div className="">
                        <div>{review.comment}</div>
                        <div style={{ color: "gray", fontSize: 12 }}>
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;

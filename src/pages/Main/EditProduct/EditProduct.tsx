import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Rate,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import {
  useGetProductByIdQuery,
  useUpdteProductByIdMutation,
} from "../../../redux/features/products/productsApi";
import { Review } from "../../../types/product";

const { Option } = Select;
const { TextArea } = Input;

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: product, isLoading } = useGetProductByIdQuery(Number(id));
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdteProductByIdMutation();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        dimensions: {
          width: product.dimensions.width,
          height: product.dimensions.height,
          depth: product.dimensions.depth,
        },
      });
      setReviews(product.reviews);
    }
  }, [product, form]);

  interface ProductFormValues {
    title: string;
    category: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
  }

  const onFinish = async (values: ProductFormValues) => {
    try {
      const updatedProduct = {
        ...values,
        id: Number(id),
        dimensions: {
          width: values.dimensions.width,
          height: values.dimensions.height,
          depth: values.dimensions.depth,
        },
        reviews,
      };

      console.log("Submitting:--------------->>", updatedProduct);

      await updateProduct(updatedProduct).unwrap();
      messageApi.success("Product updated successfully");
      navigate(`/products/${id}`);
    } catch (err) {
      messageApi.error("Failed to update product");
      console.error("Failed to update product:", err);
    }
  };

  const addReview = () => {
    setReviews([
      ...reviews,
      {
        rating: 5,
        comment: "",
        date: new Date().toISOString(),
        reviewerName: "",
        reviewerEmail: "",
      },
    ]);
  };

  const removeReview = (index: number) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  const updateReview = (
    index: number,
    field: keyof Review,
    value: string | number
  ) => {
    const newReviews = [...reviews];
    newReviews[index] = { ...newReviews[index], [field]: value };
    setReviews(newReviews);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <Card
        title={
          <div className="flex justify-center items-center gap-4">
            <Button
              type="text"
              onClick={() => navigate(-1)}
              icon={
                <span className="text-lg">
                  {" "}
                  <FaArrowLeft />{" "}
                </span>
              }
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full"
            />
            <h2>{`Edit Product: ${product?.title}`}</h2>
          </div>
        }
        //   title={`Edit Product: ${product?.title}`}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...product,
            dimensions: {
              width: product?.dimensions.width,
              height: product?.dimensions.height,
              depth: product?.dimensions.depth,
            },
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  { required: true, message: "Please enter product title" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category" loading={!categories}>
                  {categories?.map((category) => (
                    <Option key={category.slug} value={category.slug}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) => `$ ${value}`}
                  parser={(value) => {
                    parseFloat(value?.replace(/\$\s?|(,*)/g, "") || "0");
                    return 0;
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="discountPercentage"
                label="Discount Percentage"
                rules={[{ required: true, message: "Please enter discount" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => {
                    const parsedValue = parseFloat(
                      value?.replace("%", "") || "0"
                    );
                    const clampedValue = Math.min(
                      100,
                      Math.max(0, isNaN(parsedValue) ? 0 : parsedValue)
                    );
                    return clampedValue === 100 ? 100 : 0;
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: "Please enter stock" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name={["dimensions", "width"]}
                label="Width (cm)"
                rules={[{ required: true, message: "Please enter width" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={["dimensions", "height"]}
                label="Height (cm)"
                rules={[{ required: true, message: "Please enter height" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={["dimensions", "depth"]}
                label="Depth (cm)"
                rules={[{ required: true, message: "Please enter depth" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Reviews</Divider>

          <List
            dataSource={reviews}
            renderItem={(review, index) => (
              <List.Item
                actions={[
                  <MinusCircleOutlined
                    key="remove"
                    onClick={() => removeReview(index)}
                    style={{ color: "red" }}
                  />,
                ]}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    placeholder="Reviewer Name"
                    value={review.reviewerName}
                    onChange={(e) =>
                      updateReview(index, "reviewerName", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Reviewer Email"
                    value={review.reviewerEmail}
                    onChange={(e) =>
                      updateReview(index, "reviewerEmail", e.target.value)
                    }
                  />
                  <Rate
                    value={review.rating}
                    onChange={(value) => updateReview(index, "rating", value)}
                  />
                  <Input.TextArea
                    placeholder="Comment"
                    value={review.comment}
                    onChange={(e) =>
                      updateReview(index, "comment", e.target.value)
                    }
                  />
                </Space>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={addReview}
            block
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Add Review
          </Button>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Submit
              </Button>
              <Button onClick={() => navigate(`/products/${id}`)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;

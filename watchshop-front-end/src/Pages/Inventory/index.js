import { Avatar, Button, Modal, Space, Table, Typography, Input, message, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { getProducts, updateProduct, addProduct } from "../../API"; // Import your API functions here
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from '@ant-design/icons';
import { uploadImageToFirebase } from "../../firebase"; // Import your Firebase upload function

function Products() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updating, setUpdating] = useState(false); // State to track update process
  const [imageUrl, setImageUrl] = useState(null); // State to track selected image URL
  const [formData, setFormData] = useState({
    file: '',
    data: {
      product_name:'',
      status:'',
      quantity:0,
      price: 0,
      detail:'',
      technology:'',
      glass:'',
      func:'',
      color:'',
      machine:'',
      sex:'',
      accuracy:'',
      battery_life:'',
      water_resistance:'',
      weight:'',
      other_features:'',
      brand_name:'',
      category_name:''
    },
  });

 const token = localStorage.getItem("token");
  
  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProducts(); // Call API to fetch products
      if (res && res.data && res.data.length > 0) {
        setDataSource(res.data); // Update dataSource with API response
      } else {
        console.error("No product data returned from API.");
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      // Upload image to Firebase if file is selected
      let imageUrl = formData.data.image; // Use existing image URL if available
      if (formData.file) {
        imageUrl = await uploadImageToFirebase(formData.file);
      }

      const newProductData = {
        ...formData.data,
        image: imageUrl,
      };

      const res = await addProduct(newProductData,token); // Call API to add product
      if (res && res.data) {
        message.success("Product added successfully!");
        setModalVisible(false);
        fetchData(); // Refresh data
      } else {
        message.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDetail = (record) => {
    setSelectedProduct(record); // Set selected product for modal
    setFormData({
      file: '',
      data: {
        product_name: record.product_name,
        status: record.status,
        quantity: record.quantity,
        price: record.priceUpdateDetails[0].price_new,
        image: record.image,
        detail: record.detail,
        technology: record.technology,
        glass: record.glass,
        func: record.func,
        color: record.color,
        machine: record.machine,
        sex: record.sex,
        accuracy: record.accuracy,
        battery_life: record.battery_life,
        water_resistance: record.water_resistance,
        weight: record.weight,
        other_features: record.other_features,
        brand_name: record.brand.brand_name,
        category_name: record.category.category_name
      }
    });
    setImageUrl(record.image); // Set image URL
    setModalVisible(true); // Show modal
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    setUpdating(true); // Set updating state to true

    try {
      // Upload image to Firebase and get the URL
      if (formData.file) {
        const imageUrl = await uploadImageToFirebase(formData.file);
        formData.data.image = imageUrl;
      }

      const updatedProduct = { ...selectedProduct, ...formData.data };
      const res = await updateProduct(selectedProduct.product_id, updatedProduct, token); // Send update request
      if (res && res.data) {
        message.success("Product updated successfully!"); // Show success message
        setModalVisible(false); // Close modal after update
        fetchData(); // Fetch new data after update
      } else {
        message.error("Failed to update product. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product. Please try again."); // Show error message
    } finally {
      setUpdating(false); // Set updating state back to false
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
    setSelectedProduct(null); // Clear selected product
    setFormData({
      file: '',
      data: {
        product_name:'',
        status:'',
        quantity:0,
        price: 0,
        detail:'',
        technology:'',
        glass:'',
        func:'',
        color:'',
        machine:'',
        sex:'',
        accuracy:'',
        battery_life:'',
        water_resistance:'',
        weight:'',
        other_features:'',
        brand_name:'',
        category_name:''
      }
    }); // Reset form data
    setImageUrl(null); // Reset image URL
  };

  const handleAddNew = () => {
    setSelectedProduct(null); // Clear selected product
    setFormData({
      file: '',
      data: {
        product_name:'',
        status:'',
        quantity:0,
        price: 0,
        detail:'',
        technology:'',
        glass:'',
        func:'',
        color:'',
        machine:'',
        sex:'',
        accuracy:'',
        battery_life:'',
        water_resistance:'',
        weight:'',
        other_features:'',
        brand_name:'',
        category_name:''
      },
    });
    setImageUrl(null); // Reset image URL
    setModalVisible(true); // Show modal
  };

  const renderColumns = (record) => {
    const createdByName = record.created_product ? `${record.created_product.first_name} ${record.created_product.last_name}` : '';
    const updatedByName = record.updated_product ? `${record.updated_product.first_name} ${record.updated_product.last_name}` : '';
    const fields = [
      { label: 'Product ID', key: 'product_id', value: record.product_id , disabled: true },
      { label: 'Product Name', key: 'product_name', value: formData.data.product_name, type: 'text' },
      { label: 'Link image', key: 'image', value: formData.data.image, type: 'text' },
      { label: 'Price', key: 'price', value: formData.data.price, type: 'number' },
      { label: 'Quantity', key: 'quantity', value: formData.data.quantity, type: 'number' },
      { label: 'Technology', key: 'technology', value: formData.data.technology, type: 'text' },
      { label: 'Brand Name', key: 'brand_name', value: formData.data.brand_name, type: 'text' },
      { label: 'Category Name', key: 'category_name', value: formData.data.category_name, type: 'text' },
      { label: 'Glass', key: 'glass', value: formData.data.glass, type: 'text' },
      { label: 'Function', key: 'func', value: formData.data.func, type: 'text' },
      { label: 'Color', key: 'color', value: formData.data.color, type: 'text' },
      { label: 'Machine', key: 'machine', value: formData.data.machine, type: 'text' },
      { label: 'Sex', key: 'sex', value: formData.data.sex, type: 'text' },
      { label: 'Accuracy', key: 'accuracy', value: formData.data.accuracy, type: 'text' },
      { label: 'Battery Life', key: 'battery_life', value: formData.data.battery_life, type: 'text' },
      { label: 'Water Resistance', key: 'water_resistance', value: formData.data.water_resistance, type: 'text' },
      { label: 'Weight', key: 'weight', value: formData.data.weight, type: 'text' },
      { label: 'Other Features', key: 'other_features', value: formData.data.other_features, type: 'text' },
      { label: 'Create At', key: 'created_at', value: record.created_at, type: 'date', disabled: true },
      { label: 'Updated At', key: 'updated_at', value: record.updated_at, type: 'date', disabled: true },
      { label: 'Status', key: 'status', value: formData.data.status, type: 'select' },
      { label: 'Describe', key: 'detail', value: formData.data.detail, type: 'textarea' },
      { label: 'Create By', key: 'created_by', value: createdByName, disabled: true, type: 'text' },
      { label: 'Update By', key: 'updated_by', value: updatedByName, disabled: true, type: 'text' }
    ];
  
    const statusOptions = ['Active', 'Inactive']; // Example status options
  
    const half = Math.ceil(fields.length / 2);
    const leftFields = fields.slice(0, half);
    const rightFields = fields.slice(half);
  
    const handleChange = (key, value) => {
      setFormData({
        ...formData,
        data: {
          ...formData.data,
          [key]: value,
        },
      });
    };
  
    const renderInput = (field) => {
      const inputProps = {
        value: field.value,
        disabled: field.disabled || false,
        onChange: (e) => handleChange(field.key, e.target.value),
      };
  
      switch (field.type) {
        case 'text':
          return <Input {...inputProps} />;
        case 'number':
          return <Input type="number" {...inputProps} />;
        case 'textarea':
          return <TextArea {...inputProps} />;
        case 'select':
          return (
            <Select style={{left:20}}
              value={field.value}
              onChange={(value) => handleChange(field.key, value)}
              disabled={field.disabled || false}
            >
              {statusOptions.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          );
        default:
          return <Input {...inputProps} />;
      }
    };
  
    const renderFields = (fieldsArray) =>
      fieldsArray.map((field) => (
        <div key={field.key} style={{ marginBottom: "1rem" }}>
          <Typography.Text strong>{field.label}</Typography.Text>
          {renderInput(field)}
        </div>
      ));
  
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "1rem" }}>
          {renderFields(leftFields)}
        </div>
        <div style={{ flex: 1 }}>
          {renderFields(rightFields)}
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (link) => <Avatar src={link} />,
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
    },
    {
      title: "Price",
      dataIndex: ["priceUpdateDetails", "0", "price_new"], // Access the price field inside priceUpdateDetails array
      render: (text) => {
        if (text && typeof text === "number") {
          return text.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        }
        return text; // Render the value as it is if it's not a number
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Button type="primary" style={{left:30}} onClick={() => handleDetail(record)}>
          View Details
        </Button>       
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>Product List</Typography.Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddNew}>Add New</Button>
      </Space>
      <Table
        style={{ width: "1200px" }}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey="product_id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      <Modal
        title={selectedProduct ? "Update Product" : "Add New Product"}
        visible={modalVisible}
        onCancel={handleCloseModal}
        onOk={selectedProduct ? handleUpdate : handleSave}
        confirmLoading={updating}
        width={1000}
      >
        {renderColumns(selectedProduct || formData.data)}
        <div>
          <Typography.Text strong>Upload Image</Typography.Text>
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            showUploadList={false}
            beforeUpload={(file) => {
              setImageUrl(URL.createObjectURL(file));
              setFormData({ ...formData, file });
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          {imageUrl && (
            <div style={{ marginTop: 16 }}>
              <img src={imageUrl} alt="Selected" style={{ width: '100%', height: '20%' }} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Products;

import axios from "axios";

export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};


export const getProducts = () => {
  return fetch("http://localhost:9999/api/product/all").then((res) => res.json());
};
export const addProduct = (productData,token) => {
  return fetch("http://localhost:9999/api/staff/product/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Include the Authorization header
    },
    body: JSON.stringify(productData),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .catch((error) => {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product. Please try again.');
  });
};


export const updateProduct = (product_id, updatedProductData, token) => {
  return fetch(`http://localhost:9999/api/staff/product/${product_id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Include the Authorization header
    },
    body: JSON.stringify(updatedProductData),
  }).then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

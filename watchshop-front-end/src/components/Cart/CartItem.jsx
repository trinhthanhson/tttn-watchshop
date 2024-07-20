import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const CartItem = ({ cart, onQuantityChange, onDeleteSuccess }) => {
  const { product, price, size } = cart;
  const [quantity, setQuantity] = useState(cart.quantity);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity >= 1) {
      try {
        const apiUrl = 'http://localhost:9999/api/cart/update/quantity';
        const requestBody = {
          product_id: product?.product_id,
          size: size,
          quantity: newQuantity
        };
        const token = localStorage.getItem('token');

        const response = await axios.put(apiUrl, requestBody, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Cart updated successfully:', response.data);
        setQuantity(newQuantity);
      } catch (error) {
        console.error('Failed to update cart quantity:', error);
      }
      onQuantityChange(product?.product_id, newQuantity);
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = 'http://localhost:9999/api/cart/delete/item';
      const requestBody = {
        product_id: product?.product_id,
        size: size
      };
      const token = localStorage.getItem('token');

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete items successfully:', response.data);

    } catch (error) {
      console.error('Failed to delete cart items:', error);
    }

    onDeleteSuccess();
  }

  return (
    <>
      <div
        className="p-3 shadow-lg rounded-md border-neutral-200 border-2"
      >
        <div className="flex items-center mt-2">
          <div className="w-[12rem] h-[12rem] ml-5">
            <img
              className="w-full h-full object-cover object-top"
              src={product?.image}
              alt={product?.product_name}
              loading="lazy"
            />
          </div>
          <div className="ml-8 space-y-1">
            <p className="font-bold text-lg">
              {product?.product_name}
            </p>
            <p className="opacity-80 text-sm mt-3">{size}</p>
            <p className="opacity-80 mt-3 text-sm">
              Category: {product?.category?.category_name}
            </p>
            <p className="text-main font-semibold text-lg">
              {price.toLocaleString("en")} VNĐ
            </p>
          </div>
          <div className="lg:flex items-center lg:space-x-5 pt-2 ml-[30%]">
            <div className="flex items-center justify-center mt-4 h-[42px] px-[10px] rounded-lg shadow-md">
              <button
                className="text-black text-[35px]"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                <img
                  className="w-3 h-3"
                  src="https://firebasestorage.googleapis.com/v0/b/wed-invitation-790a1.appspot.com/o/minus.png?alt=media&token=e04092d0-e2e9-4b82-a880-8fb8556afa37"
                  alt="minus-icon"
                />
              </button>

              <div className="">
                <input
                  type={"text"}
                  className="input-small w-10 mx-2 text-center"
                  step={null}
                  min={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  readOnly={true}
                />
              </div>
              <button
                className="text-black text-[25px]"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <img
                  className="w-3 h-3"
                  src="https://firebasestorage.googleapis.com/v0/b/wed-invitation-790a1.appspot.com/o/add.png?alt=media&token=5ad8a104-0a5b-4865-b900-5c810629469d"
                  alt="plus-icon"
                />
              </button>
            </div>
            <div className="flex text-sm lg:text-base mt-4 lg:mt-4">
              <button
                className="text-black mx-10"
                onClick={() => handleDelete()}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/wed-invitation-790a1.appspot.com/o/delete.png?alt=media&token=6dbf5cb5-a5ad-4ec8-afc0-61ce07d6f2f3"
                  alt="delete-icon"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CartItem.propTypes = {
  cart: PropTypes.object.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default CartItem

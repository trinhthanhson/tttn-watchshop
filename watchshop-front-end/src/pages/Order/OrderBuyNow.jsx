import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const OrderBuyNow = () => {
  const location = useLocation()
  const { product, quantity } = location.state || {}

  const [address, setAddress] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  if (!product) {
    return <div>No product selected for buying now.</div>
  }

  const token = localStorage.getItem('token')

  // Calculate total price
  const totalPrice = quantity * product.priceUpdateDetails[0].price_new

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleAddressSave = () => {
    if (recipientName && shippingAddress && recipientPhone) {
      setAddress(`${recipientName}, ${recipientPhone}, ${shippingAddress}`)
      handleCloseModal()
    }
  }

  const handleOrder = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(
        'http://localhost:9999/api/customer/order/buy-now',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            product_id: product.product_id,
            quantity,
            price: product.priceUpdateDetails[0].price_new,
            address,
            recipient_name: recipientName,
            note,
            recipient_phone: recipientPhone
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const data = await response.json()
      if (data.code === 201) {
        setSuccess('Order placed successfully!')
      } else {
        setSuccess('Order placed fail!')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-5 bg-gray-100">
      <div
        className="w-full h-full bg-white border border-gray-200 p-5 rounded-lg shadow-lg"
        style={{ marginTop: '50px' }}
      >
        <div className="flex items-center mt-5">
          <input
            type="text"
            value={address}
            readOnly
            placeholder="Enter shipping address"
            className="border border-gray-300 p-2 rounded mr-2 w-[1000px]"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleOpenModal}
          >
            Enter Address
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Buy Now</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-t border-gray-300">
          {/* Headers Row */}
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Image
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Product Name
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Quantity
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Price
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Total Price
          </div>

          {/* Data Row */}
          <div className="flex justify-center items-center border-b border-r border-gray-300 p-2">
            <img
              src={product.image}
              alt={product.product_name}
              className="w-48 h-48 object-cover rounded-lg border border-gray-200 w-[400px]"
            />
          </div>
          <div className="flex items-center border-b border-r border-gray-300 p-2">
            <span>{product.product_name}</span>
          </div>
          <div className="flex items-center border-b border-r border-gray-300 p-2 justify-center">
            <span>{quantity}</span>
          </div>
          <div className="flex items-center border-b border-r border-gray-300 p-2 justify-center">
            <span>
              {product.priceUpdateDetails[0].price_new.toLocaleString('en')} VNĐ
            </span>
          </div>
          <div className="flex items-center border-b p-2 justify-center">
            <span>{totalPrice.toLocaleString('en')} VNĐ</span>
          </div>
        </div>

        <button
          className={`mt-5 p-2 rounded ${loading ? 'bg-gray-300' : 'bg-blue-500'} text-white hover:bg-blue-600`}
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ? 'Placing order...' : 'Đặt hàng'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}

        {/* Address Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg w-80"
              style={{ width: 600 }}
            >
              <h2 className="text-xl font-bold mb-4">Enter Shipping Address</h2>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Shipping Address
                </label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Recipient Phone{' '}
                </label>
                <input
                  type="number"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 "
                  style={{ marginTop: 10 }}
                  onClick={handleAddressSave}
                >
                  Save
                </button>
                <button
                  className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  style={{ marginTop: 10 }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderBuyNow

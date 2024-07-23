import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetailRequest } from '../../redux/actions/actions'
import axios from 'axios'
//import OrderTraker from '../../components/Order/OrderTraker'

const OrderDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const orderDetail = useSelector((state) => state.orderDetail.orderDetail)
  console.log(orderDetail?.customer_created)
  useEffect(() => {
    try {
      dispatch(getOrderDetailRequest(id))
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch, id])

  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      axios
        .put(
          `http://localhost:9999/api/customer/order/${id}/status`,
          { status: 5 },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          dispatch(getOrderDetailRequest(id))
        })
    } catch (error) {
      console.error('Error change order status', error)
    }
  }

  //const activeStep = orderDetail?.status

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-[url('https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYCOFFEE/Untitled-1-01.png')]">
        <div className="relative md:w-full pt-[80px]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <h1 className="uppercase text-center sm:text-left font-RobotoSemibold text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight">
              {/* <OrderTraker activeStep={activeStep} /> */}
            </h1>
          </div>
        </div>
      </section>

      <div className="flex gap-5 mt-8">
        <div className="flex flex-[0.5] gap-4 w-[80%] ml-[6%] rounded-lg shadow-lg bg-white mt-2">
          <div className="w-full ml-5">
            <h5 className="text-left text-lg font-RobotoSemibold text-primary py-3">
              Thông Tin Nhận Hàng
            </h5>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Họ Và Tên:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.recipient_name}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Địa Chỉ Nhận Hàng:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.address}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Email:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.customer_created?.email}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Số Điện Thoại:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.recipient_phone}
              </span>
            </p>
          </div>
        </div>
        <div className="flex-[0.4] w-[80%] ml-[20px] mr-[50px] rounded-md shadow-md bg-white mt-2">
          <div className="ml-5">
            <h5 className="text-left text-lg font-RobotoSemibold text-primary py-3">
              Chi Tiết Hóa Đơn
            </h5>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Tổng số lượng:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.total_quantity}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Tổng tiền:
              </span>
              {orderDetail?.total_price && (
                <span className="text-primary font-RobotoSemibold">
                  {orderDetail.total_price.toLocaleString('en')} VNĐ
                </span>
              )}
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Phí vận chuyển:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {(20000).toLocaleString('en')} VNĐ
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Thanh toán:
              </span>
              {orderDetail?.total_price && (
                <span className="text-primary font-RobotoSemibold">
                  {(orderDetail.total_price + 20000).toLocaleString('en')} VNĐ
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[83%] ml-[6%] rounded-md shadow-md bg-white mt-8">
        <table className="w-full text-gray-700">
          <thead className="text-white font-RobotoSemibold text-[18px] ">
            <tr className="bg-primary">
              <td className="rounded-s-md">STT</td>
              <td>Hình Ảnh</td>
              <td>Sản Phẩm</td>
              <td>Số Lượng</td>
              <td>Đơn Giá</td>
              <td>Tổng Tiền</td>
              <td className="rounded-e-md">Ngày Đặt</td>
            </tr>
          </thead>
          <tbody>
            {orderDetail?.orderDetails &&
              orderDetail.orderDetails.map((orderItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="flex items-center">
                    <img
                      className="w-[60px] mt-[2px] rounded-full shadow-md mr-2"
                      src={orderItem?.product.image}
                      alt={orderItem?.product.product_name}
                    />
                  </td>

                  <td>
                    <p>{orderItem?.product.product_name}</p>
                  </td>
                  <td>{orderItem?.quantity}</td>
                  <td>
                    {orderItem.product.priceUpdateDetails[0].price_new.toLocaleString(
                      'en'
                    )}{' '}
                    VNĐ
                  </td>
                  <td>{orderDetail.total_price.toLocaleString('en')} VNĐ</td>
                  <td>
                    {new Date(orderDetail.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="ml-[5%] w-[80%] flex justify-between my-6">
        <div></div>
        <div className="flex gap-3">
          {orderDetail?.status === '0' && (
            <button
              onClick={() => handleCancelOrder()}
              className="mt-5 bg-main text-white font-RobotoMedium text-[16px] rounded-md p-2 shadow-md hover:bg-hoverRed ease-out duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-r border-none"
            >
              Hủy Đơn Hàng
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default OrderDetail

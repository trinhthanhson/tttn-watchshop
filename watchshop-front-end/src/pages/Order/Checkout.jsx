import { useCallback, useEffect } from 'react';
import OrderTracker from '../../components/Order/OrderTraker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem';
import { addOrderRequest, getAllCartRequest, getUserProfileRequest } from '../../redux/actions/actions';

const Checkout = () => {
  const activeStep = -1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector(state => state.user.user.data);

  useEffect(() => {
    dispatch(getUserProfileRequest());

  }, [dispatch])

  const getAllCart = useCallback(() => {
    dispatch(getAllCartRequest());
  }, [dispatch]);

  useEffect(() => {
    getAllCart();
  }, [getAllCart]);

  const handleOrderButtonClick = () => {
    dispatch(addOrderRequest())
    navigate('/orders-history')
  }

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-[url('https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYCOFFEE/Untitled-1-01.png')]">
        <div className="relative md:w-full pt-[80px]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <h1 className="uppercase text-center sm:text-left font-RobotoSemibold text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight">
              <OrderTracker activeStep={activeStep} />
            </h1>
          </div>
        </div>
      </section>

      <section className='p-6'>
        <div className='p-10 flex'>
          <div className='flex-[0.85] bg-white rounded-md shadow-lg p-10 mx-10 border'>
            <h1 className='text-2xl font-RobotoSemibold text-main'>Thông Tin Nhận Hàng</h1>
            <div className='mt-5'>
              <span className='font-RobotoSemibold'>Người nhận: {user?.firstname} {user?.lastname}</span>
            </div>
            <div className='mt-5'>
              <span className='font-RobotoSemibold'>SĐT: {user?.phone}</span>
            </div>
            <div className='mt-5'>
              <span className='font-RobotoSemibold'>Địa chỉ: {user?.address}</span>
            </div>
          </div>

          <div className="flex-[0.5]" >
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4 uppercase">Chi Tiết Hóa Đơn</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>Tổng</span>
                  <span style={{ justifyContent: "flex-end" }}>{cart?.data?.total_price.toLocaleString('en')} VNĐ</span>
                </div>

                <div className="flex justify-between">
                  <span>Giảm Giá</span>
                  <span className="text-green-700">0 VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí Vận Chuyển</span>
                  <span className="text-green-700">{(20000).toLocaleString('en')} VNĐ</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Thanh Toán</span>
                  <span className="text-green-700">{(cart?.data?.total_price + 20000).toLocaleString('en')} VNĐ</span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-5">
                <button
                  onClick={() => handleOrderButtonClick()}
                  className="w-[50%] bg-green-500 bg-primary text-white p-2 rounded-md mt-5 shadow-md hover:bg-main transition duration-300 ease-in-out"
                >
                  Đặt Hàng
                </button>
                <button
                  className="w-[50%] bg-green-500 bg-primary text-white p-2 rounded-md mt-5 shadow-md hover:bg-main transition duration-300 ease-in-out"
                >
                  Thanh Toán
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 ">
            <div className="space-y-3">
              {cart.data && cart?.data?.cart_detail.length > 0 && (
                cart?.data?.cart_detail.map((item, index) =>
                  <CartItem
                    key={index}
                    cart={item}
                  />
                )
              )}
            </div>
          </div>
        </div>
        {/* <button onClick={() => setActiveStep((prevStep) => Math.min(prevStep + 1, 4))}>
          Next Step
        </button>
        <button onClick={() => setActiveStep((prevStep) => Math.max(prevStep - 1, 0))}>
          Previous Step
        </button> */}
      </section>
    </>
  );
};

export default Checkout;

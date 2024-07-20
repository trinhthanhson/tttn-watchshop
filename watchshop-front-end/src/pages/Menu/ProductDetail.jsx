import { useParams } from "react-router-dom";
import CardProductSimilar from "../../components/Products/CardProductSimilar";
import CardSizeItem from "../../components/Products/CardSizeItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addCartRequest, getAllProductsCustomerRequest } from "../../redux/actions/actions";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsCustomer = useSelector(state => state.productsCustomer.productsCustomer.data);
  const selectedProduct = productsCustomer ? productsCustomer.find((item) => item.product_id === id) : null;
  const currentProduct = productsCustomer ? productsCustomer.filter((item) => item.product_id !== id) : [];
  const category_id = selectedProduct?.category?.category_id;
  const [sizeData, setSizeData] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    dispatch(getAllProductsCustomerRequest());
  }, [dispatch]);

  useEffect(() => {
    if (category_id) {
      fetchData();
    }
  }, [selectedProduct]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get(`http://localhost:9999/api/order/size/category?category_id=${category_id}`, config);
      const data = response.data.data;

      setSizeData(data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSizeClick = (selectedSize) => {
    setSelectedSize(selectedSize);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(addCartRequest({ product_name: `${selectedProduct?.product_name}`, size: selectedSize }));
    } else {
      console.log("Vui lòng chọn size trước khi thêm vào giỏ hàng");
    }
  };

  return (
    <div className="pt-[120px]">
      <section className="pt-[0] pb-[30px] w-full">
        <div className="border border-grey mx-auto flex flex-wrap rounded-lg shadow-xl bg-white items-center relative max-w-[80%]">
          <div className="w-full lg:w-[40%] xl:w-[50%] h-[50%]">
            <div className="w-[350px] h-[350px] md:pt-[20px] md:ml-12">
              <img
                className="w-full object-cover object-center h-[270px] sm:h-[350px] lg:h-full p-0 sm:ml-[80px]"
                src={selectedProduct?.image}
                alt="image-product"
              />
            </div>
          </div>
          <div className="w-full lg:w-[60%] xl:w-[50%] h-full flex">
            <div className="flex flex-col justify-between 3xl:justify-center items-start p-5 lg:p-10 w-full">
              <h1 className="leading-tight font-RobotoMedium text-primary text-3xl md:text-4xl lg:text-[26px] 3xl:text-[35px] mb-[10px] 3xl:mb-3">
                {selectedProduct?.product_name}
              </h1>
              <p className="font-medium text-[16px] lg:text-[16px] 3xl:text-[20px] mb-5 flex text-borderDarkGray">
                <img
                  className="object-contain object-center w-[18px] h-auto mr-3"
                  src="https://www.gamudaland.com.my/_next/image?url=%2Fimages%2Flanding%2Flocation.png&w=48&q=75"
                  alt="locate-icon"
                />
                không biết
              </p>
              <hr className="mb-5 w-full" />
              <div className="grid grid-cols-12 items-center justify-between w-full mb-5">
                <div className="col-span-12 sm:col-span-6 mb-2 sm:mb-0 pr-[10px] mr-[10px]">
                  <p className="font-serif text-sub text-[18px] 3xl:text-[17px]">
                    Giá
                  </p>
                  <p className="text-main font-RobotoMedium text-[18px] lg:text-[17px] 3xl:text-[20px]">
                    {selectedProduct?.priceUpdateDetails[0]?.price_new.toLocaleString("en")} VNĐ
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-6 mb-2 sm:mb-0 pr-[10px] mr-[10px]">
                  <p className="font-serif text-sub text-[18px] 3xl:text-[17px]">
                    Loại
                  </p>
                  <p className="text-main font-RobotoMedium text-[18px] lg:text-[17px] 3xl:text-[20px]">
                    {selectedProduct?.category?.category_name}
                  </p>
                </div>
              </div>
              <hr className="mb-5 w-full" />
              <p className="font-serif text-sub text-[18px] 3xl:text-[17px]">
                Size
              </p>
              <div className="flex items-center justify-center gap-4 mt-1">
                {sizeData && sizeData.map((item, index) => (
                  <CardSizeItem
                    key={index}
                    size={item?.size?.size_name}
                    isSelected={selectedSize === item?.size?.size_name}
                    onClick={handleSizeClick}
                  />
                ))}

              </div>
              {selectedProduct?.description && (
                <>
                  <hr className="mb-5 w-full" />
                  <div className="w-full mb-5">
                    <div>
                      <p className="font-medium text-[14px] text-justify text-primary">
                        {selectedProduct?.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
              <hr className="mb-5 w-full" />
              <div className="grid sm:grid-cols-2 gap-4 items-center sm:justify-between w-full">
                <div className="w-full">
                  <div
                    className="flex justify-center items-center p-3 text-center border border-grey text-primary hover:text-white hover:bg-primary hover:border-none rounded-lg"
                  >
                    <button
                      onClick={handleAddToCart}
                      className="font-serif text-[16px] lg:text-[17px] sm:text-lg text-inherit 3xl:text-[20px]"
                    >
                      Thêm Vào Giỏ
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`ml-1 w-4 h-4 sm:ml-2 sm:w-5 sm:h-5`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </div>

                <div className="w-full">
                  <a
                    href="#buynow"
                    className="block"
                  >
                    <div className="font-serif rounded-lg p-3 text-center border border-grey bg-primary text-white hover:bg-[#271A15] hover:text-white">
                      <p className="text-[16px] lg:text-[17px] sm:text-lg text-inherit 3xl:text-[20px] hover:border-none">
                        Mua Ngay
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-[50px] md:py-[80px]">
        <div className="container mx-auto">
          <div className="w-full mb-10">
            <h1 className="leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] 3xl:text-[3.2rem] text-primary text-center font-RobotoMedium title relative pb-6 w-full md:w-2/3 mx-auto">
              Sản Phẩm Tương Tự
            </h1>
          </div>
          <div className="w-full md:w-[80%] lg:w-[90%] 3xl:w-[85%] max-w-[90%] mx-auto md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentProduct.slice(0, 10).map((item) => (
              <CardProductSimilar key={item.product_id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail

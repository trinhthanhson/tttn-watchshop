import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-black">
        <div className="relative md:w-[50%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-whiteYellow hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Cà Phê
            </h1>
            <p className="font-normal text-center sm:text-left text-whiteYellow text-[16px] lg:text-[18px] lg:w-[100%]">
              Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng được trồng trên những vùng cao nguyên Việt Nam màu mỡ, qua những bí quyết rang xay độc đáo, Highlands Coffee chúng tôi tự hào giới thiệu những dòng sản phẩm Cà phê mang hương vị đậm đà và tinh tế.
            </p>
            <Link to='/products'>
              <button
                className="uppercase rounded-md shadow-md text-whiteYellow border-[1px] border-whiteYellow py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300"
              >
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>
        <div className="relative md:w-[50%]">
          <img
            src="https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png"
            alt="coffee-img"
            className="w-full object-cover object-bottom h-full mt-[50px]"
          />
        </div>
      </section>

      <section className="relative flex flex-col-reverse md:flex-row items-center bg-matcha bg-gradient-to-t from-transparent to-white h-[400px]">
        <div className="relative md:w-[50%]">
          <img
            src="https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png"
            alt="freeze-img"
            className="w-full object-cover object-bottom h-full"
          />
        </div>
        <div className="relative md:w-[50%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-green hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Freeze
            </h1>
            <p className="font-normal text-center sm:text-left text-green text-[16px] lg:text-[18px] lg:w-[100%]">
              Sảng khoái với thức uống đá xay phong cách Việt. Freeze là thức uống đá xay mát lạnh được pha chế từ những nguyên liệu thuần túy của Việt Nam.
            </p>
            <Link to='/products'>
              <button
                className="uppercase rounded-md shadow-md text-green border-[1px] border-green py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300"
              >
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>

      </section>

      <section className="relative flex flex-col-reverse md:flex-row items-center bg-black bg-gradient-to-r from-transparent to-white h-[400px]">
        <div className="relative md:w-[50%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-white hover:text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Trà
            </h1>
            <p className="font-normal text-center sm:text-left text-white text-[16px] lg:text-[18px] lg:w-[100%]">
              Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Highlands Coffee sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.
            </p>
            <Link to='/products'>
              <button
                className="uppercase rounded-md shadow-md text-white border-[1px] border-white py-3 px-10 mt-5 hover:bg-main hover:text-white hover:shadow-lg ease-out duration-300"
              >
                Khám Phá Thêm
              </button>
            </Link>
          </div>
        </div>
        <div className="relative md:w-[50%]">
          <img
            src="https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png"
            alt="tea-img"
            className="w-full object-cover object-bottom h-full mt-[50px]"
          />
        </div>
      </section>
    </>
  )
}

export default Menu

const Contact = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(import.meta.env.VITE_SCRIPT_GG_SHEET_ACTION, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Biểu mẫu đã được gửi thành công!');
      } else {
        throw new Error('Có lỗi xảy ra khi gửi biểu mẫu.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
    }
  };

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white">
        <div className="relative md:w-[35%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-primary hover:text-lightYellow text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              Liên Hệ
            </h1>
            <p className="font-normal text-center sm:text-left text-black text-[16px] lg:text-[18px] lg:w-[100%]">
              Highland Coffee Luôn Sẵn Sàng Lắng Nghe Và Hỗ Trợ Bạn
            </p>
          </div>
        </div>
        <div className="relative md:w-[65%]">
          <img
            src="https://www.highlandscoffee.com.vn/vnt_upload/about/Highlands_5557_R3_-_Copy.jpg"
            alt="banner"
            className="w-full object-cover object-bottom h-full lg:h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white to-whiteYellow py-[50px] md:py-[100px] px-4 md:px-8">
        <div className="w-full xl:w-10/12 mx-auto">
          <div className="grid grid-cols-12 gap-0 relative z-10">
            <div className="col-span-12 lg:col-span-7 relative z-10">
              <div dangerouslySetInnerHTML={{
                __html: `
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5330909250315!2d106.7213798745749!3d10.770422059305398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525f5f3c420d3%3A0xffe8026e14a677b8!2zMTIzLCAxMjUgTmd1eeG7hW4gQ8ahIFRo4bqhY2gsIEFuIEzhu6NpIMSQw7RuZywgUXXhuq1uIDIsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711188504055!5m2!1svi!2s" width="710" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                ` }} />
            </div>
            <div className="col-span-12 lg:col-span-5 bg-primary p-5 sm:p-10 lg:p-12 relative z-10">
              <h1 className="leading-tight text-white text-3xl md:text-3xl xl:text-[3rem] font-RobotoMedium relative">
                Trụ Sở Chính
              </h1>
              <p className="text-[14px] text-md font-bold text-white my-6">
                Địa Chỉ
              </p>
              <p className="text-sm sm:text-base text-white font-semibold">
                123-125 Nguyễn Cơ Thạch, Phường An Lợi Đông, Quận 2, Thành phố Hồ Chí Minh, Việt Nam.
              </p>
              <div className="my-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[14px] text-md font-bold text-white mb-3">
                      Số Điện Thoại
                    </p>
                    <div className="flex flex-row items-center mb-3">
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src="https://www.gamudaland.com.my/images/contact/phone.svg"
                        alt=""
                      />
                      <a
                        className="text-white font-normal text-sm sm:text-base"
                        href="#"
                      >
                        +028 6288 3966
                      </a>
                    </div>
                    <div className="flex flex-row items-center">
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src="https://www.gamudaland.com.my/images/contact/fax.svg"
                        alt=""
                      />
                      <a
                        href="#"
                        className="text-white font-normal text-sm sm:text-base"
                      >
                        +028 6288 3966
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] text-md font-bold text-white mb-3">
                      Giờ Làm Việc
                    </p>
                    <div className="flex flex-row items-center mb-3">
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src="https://www.gamudaland.com.my/_next/image?url=%2Fimages%2Fcontact%2Fdatetime.png&w=32&q=75"
                        alt="#"
                      />
                      <p className="text-sm sm:text-base text-white font-normal">
                        Mon - Fri 10am - 7pm
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <img
                        className="w-[20px] h-[20px] mr-2"
                        src="https://www.gamudaland.com.my/_next/image?url=%2Fimages%2Fcontact%2Fdatetime.png&w=32&q=75"
                        alt="#"
                      />
                      <p className="text-sm sm:text-base text-white font-normal">
                        Sat - Sun 10am - 5pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white pt-[50px] lg:pt-[15rem] pb-[50px] lg:pb-[12rem] px-4 md:px-8 lg:-mt-44">
        <div className="mb-5">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] text-primary text-center font-RobotoMedium w-full mx-auto title relative pb-5">
              Đóng Góp Ý Kiến
            </h1>
          </div>
        </div>
        <div className="w-full sm:w-3/4 xl:w-2/4 mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="Name"
              className="outline-none font-normal p-0 py-3 md:py-2 lg:py-4 w-full border-b-[1px] border-black text-black mb-5"
              placeholder="Họ Và Tên"
              required
              maxLength={100}
            />
            <div className="flex justify-center items-center gap-2 border-b-[1px] border-black">
              <img
                className="inline"
                src="https://firebasestorage.googleapis.com/v0/b/wed-invitation-790a1.appspot.com/o/vietnam.png?alt=media&token=b3a98704-0c5c-43cd-a376-e3bee778bd09"
              />
              <span className="py-5 px-1 inline font-bold">+84</span>
              <input
                type="text"
                name="Phone"
                className="outline-none font-normal p-0 w-full text-black"
                placeholder="Phone Number"
                required
                maxLength={100}
              />
            </div>

            <textarea
              type="text"
              name="Comment"
              placeholder="Ý Kiến Đóng Góp"
              className="outline-none font-normal p-0 py-3 md:py-2 lg:py-4 w-full border-b-[1px] border-black text-black mb-5"
              rows="4"
            />

            <button className="flex justify-center mx-auto items-center">
              <div className="rounded-lg p-5 py-3 w-full text-white bg-main hover:bg-hoverRed flex justify-center items-center transition ease-in delay-75">
                Xác Nhận
              </div>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: "url(https://i.ibb.co/HhbgG06/tim-mossholder-WE-Kv-ZB1l0-unsplash.jpg)", backgroundSize:"cover"}}>
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="leading-10">
              <h1 className="mb-5 text-5xl font-bold">Welcome To Language <br /> Learning School!</h1>
              <p className="mb-5 text-xl w-2/3 mx-auto">Where we believe that learning a new language is a gateway to new opportunities and experiences.Our school is here to support you every step of the way.</p>
              <Link to="/classes"><button className="btn text-white hover:text-black border-0 hover:bg-[#84D19F] text-white bg-[#584B9F]">Explore Now</button></Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: "url(https://i.ibb.co/dW4XbQ4/stephen-andrews-u0z-Tce7-KNl-Y-unsplash.jpg)", backgroundSize:"cover"}}>
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="leading-10">
              <h1 className="mb-5 text-5xl font-bold">Join Our Language <br /> Learning Community!</h1>
              <p className="mb-5 text-xl w-2/3 mx-auto">Where we believe that learning a new language is a gateway to new opportunities and experiences.Our school is here to support you every step of the way.</p>
              <Link to="/classes"><button className="btn text-white hover:text-black border-0 hover:bg-[#84D19F] text-white bg-[#584B9F]">Explore Now</button></Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: "url(https://i.ibb.co/vX5gxhz/banner2.jpg)", backgroundSize:"cover"}}>
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="leading-10">
              <h1 className="mb-5 text-5xl font-bold">Discover the Joy of <br /> Learning Languages!</h1>
              <p className="mb-5 text-xl w-2/3 mx-auto">Where we believe that learning a new language is a gateway to new opportunities and experiences.Our school is here to support you every step of the way.</p>
              <Link to="/classes"><button className="btn text-white hover:text-black border-0 hover:bg-[#84D19F] text-white bg-[#584B9F]">Explore Now</button></Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
      </>
    );
};

export default Banner;
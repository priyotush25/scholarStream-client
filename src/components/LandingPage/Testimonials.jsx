import React, { use } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import TestimonialCards from './Testimonials/TestimonialCards';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const reviewsData = fetch("/reviews.json").then((res) => res.json());

const Testimonials = () => {
  const reviews = use(reviewsData);

  return (
    <section className="py-10 bg-base-200 mt-10 rounded-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto px-4">
            Hear from students who achieved their dreams with ScholarStream
          </p>
        </div>

        <div className="mt-5">
          <Swiper
            effect={"coverflow"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper pb-12"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <TestimonialCards review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
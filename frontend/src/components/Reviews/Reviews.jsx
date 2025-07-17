import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Alicia",
    time: "3 months ago",
    text: "Great opportunity for investing in something important to you.",
    rating: 5,
    image: "https://i.pinimg.com/564x/87/7b/01/877b01f7092146efb33a6848e786d892.jpg",
  },
  {
    name: "Alex",
    time: "4 months ago",
    text: "Professional, reliable results. Painless investment into solar renewables with a decent ROI.",
    rating: 5,
    image: "https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947",
  },
  {
    name: "Wyndle",
    time: "7 months ago",
    text: "Enjoy being able to help out and grow at the same time.",
    rating: 5,
    image: "https://pbs.twimg.com/media/DZotU1hW0AEDN5F.jpg:large",
  },
  {
    name: "Sophie",
    time: "2 months ago",
    text: "I love how transparent the investment process is. Highly recommended!",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj3IzQtWN5Mh8xNHfltIeO6rP9FBlWKhwELl7Z7H2r38xinOS6mEal53GeTQbvmJ-Ugak&usqp=CAU",
  },
  {
    name: "James",
    time: "6 months ago",
    text: "The best experience I've had with renewable energy investments.",
    rating: 5,
    image: "https://img.freepik.com/free-photo/teenager-boy-portrait_23-2148105678.jpg",
  },
  {
    name: "Emma",
    time: "1 month ago",
    text: "A smart way to make a sustainable impact while earning good returns.",
    rating: 5,
    image: "https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg",
  },
  {
    name: "Daniel",
    time: "5 months ago",
    text: "I appreciate the support team always being available!",
    rating: 5,
    image: "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
  },
  {
    name: "Olivia",
    time: "8 months ago",
    text: "Smooth process and a great way to invest in clean energy.",
    rating: 5,
    image: "https://img.freepik.com/free-photo/beautiful-charming-girl-wears-pink-hoodie-visor-cap-back_176532-7775.jpg",
  },
  {
    name: "Michael",
    time: "9 months ago",
    text: "I feel good knowing my money is contributing to a greener future.",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIV84qK7oSHGMk_7wiZjH3K__lvmkJr9hjw&s",
  },
  {
    name: "Sophia",
    time: "10 months ago",
    text: "Best decision I've made! Great returns and excellent customer service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
];

// Helper to render stars
const StarRating = ({ count }) => {
  return (
    <div className="flex justify-center space-x-1  mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={18}  strokeWidth={1} />
      ))}
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          See What Our Investors Are Saying
        </h2>
        <div className="flex items-center justify-center gap-2  text-xl font-semibold mb-2">
          <Star size={20}  strokeWidth={1.5} />
          <Star size={20}  strokeWidth={1.5} />
          <Star size={20}  strokeWidth={1.5} />
          <Star size={20}  strokeWidth={1.5} />
          <Star size={20}  strokeWidth={1.5} />
          <span className="text-gray-800 ml-2 text-base font-medium">5.0 rating from 96 reviews</span>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-base sm:text-lg">
          At <strong>EcoMitra</strong>, we believe in delivering more than just returns.
          Our investors trust us to align their financial goals with their values. We're
          committed to transparency and exceptional service that truly makes a difference.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="py-12  text-black"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="hover:scale-105 hover:shadow-2xl hover: bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md  transition-all duration-300 h-full flex flex-col items-center text-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover shadow mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{review.time}</p>
              <StarRating count={review.rating} />
              <p className="text-gray-700 text-sm sm:text-base">{review.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;

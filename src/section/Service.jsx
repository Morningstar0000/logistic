"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Globe,
  ChevronLeft,
  ChevronRight,
  UserRound,
  Plane,
  Truck,
  Ship,
  Box,
  PackageOpen,
  Earth
} from "lucide-react";
import { useCountUp } from "../Hooks/useCountUp";
import { useIntersectionObserver } from "../Hooks/useIntersection";

const services = [
  {
    icon: <Truck color="#8fc3fd" size={40} />,
    title: "Road Transport",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nostrum minima eligendi neque labore",
  },
  {
    icon: <Plane color="#8fc3fd" size={40} />,
    title: "Air Transport",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nostrum minima eligendi neque labore",
  },
  {
    icon: <Ship size={40} color="#8fc3fd" />,
    title: "Sea Transport",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nostrum minima eligendi neque labore",
  },
];

export function Ourservice() {
  return (
    <section className="align-element py-16">
      <div className="text-center mb-12">
        <h3 className="text-blue-500 font-medium mb-4">OUR SERVICES</h3>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
          We Are Trusted For Our Services
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit porro,
          aliquid reprehenderit iusto inventore sint beatae ipsum impedit in sit
          numquam illum distinctio sequi quisquam et hic tempore
        </p>
      </div>

      {/* card */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((details, index) => {
          return (
            <div
              className="bg-white p-8 rounded-lg shadow-lg text-center  transition-all duration-300 ease-in-out 
                          hover:scale-[1.03] hover:shadow-xl
                          group"
              key={index}
            >
              <div
                className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6
                 transition-all duration-700 ease-in-out 
                            transform group-hover:rotate-y-180 group-hover:scale-110
                            perspective-1000 preserve-3d"
              >
                {details.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{details.title}</h3>
              <p className="text-gray-700 mb-6">{details.description}</p>
              <a href="#" className="text-blue-500 font-medium hover:underline  before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 
                                   before:transition-all before:duration-300 hover:before:w-full">
                Read More
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const features = [
  {
    icon: <Calendar className="w-10 h-10" />,
    title: "20+ Years Work Experiences",
    bgColor: "bg-amber-50",
  },
  {
    icon: <Calendar className="w-10 h-10" />,
    title: "20+ Years Work Experiences",
    bgColor: "bg-amber-50",
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "World's Areas Covered",
    bgColor: "bg-red-50",
  },
  {
    icon: <UserRound className="w-10 h-10" />,
    title: "Coperate and Official Client",
    bgColor: "bg-blue-50",
  },
];

export function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const carouselRef = useRef(null);

  // Update visible slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = features.length;
  const maxSlide = Math.max(0, totalSlides - visibleSlides);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className=" align-element relative py-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="services-headline  space-y-4 md:space-y-6">
          <div className="services-headline  space-y-4 md:space-y-6 ">
          <h3 className="text-blue-500 font-medium tracking-wide uppercase">
            WHY CHOOSE US
          </h3>

          <h1 className="text-3xl sm:text-8xl md:text-5xl font-bold text-gray-900 leading-tight">
            We Are The Best And That's Why You Can Choose Us Easily
          </h1>

          <p className="text-gray-600 leading-relaxed">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
            ratione eveniet eum. Quam enim inventore, exercitationem error ad
            temporibus sit facere quaerat architecto impedit ullam quasi vitae
            distinctio eos labore?
          </p>
          </div>

          <div className="relative mt-8 w-[400px] md:w-[600px]">
            <div ref={carouselRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-600 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * (100 / visibleSlides)
                    }%)`,
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 p-4 w-full sm:w-1/2 lg:w-1/3`}
                  >
                    <div className={`${feature.bgColor} p-6 rounded-lg h-full`}>
                      <div className="text-blue-500 mb-4">{feature.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center mt-6 items-center gap-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`p-1 rounded-full ${currentSlide === 0 ? "text-gray-300" : "text-blue-500"
                  }`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${currentSlide === index
                        ? "bg-blue-500"
                        : "border border-blue-500"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className={`p-1 rounded-full ${currentSlide === maxSlide ? "text-gray-300" : "text-blue-500"
                  }`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden ">
            <img
              src="service.jpg"
              alt="Delivery service"
              className="object-fill"
              priority="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard for Achivement.
const StatCard = ({ icon, value, label, isInView, delay = 0 }) => {
  const count = useCountUp({
    end: value,
    start: 0,
    duration: 2000,
    delay,
    isInView,
  })

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="bg-[#e3f2fd] p-4 rounded-full mb-4">{icon}</div>
      <h2 className="text-4xl font-bold mb-2">{count} +</h2>
      <p className="text-[#2196F3] text-lg">{label}</p>
    </div>
  )
}
// AchievementSection
export function AchievementSection() {
  const [sectionRef, isInView] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true // Add this to only trigger once
  })

  return (
    <>
    {/* Stats Cards */}
    <section ref={sectionRef} className="align-element py-15 bg-white-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <StatCard
          icon={<Box className="w-8 h-8 text-[#2196F3] stroke-[1.5]" />}
          value={950}
          label="Delivered Packages"
          isInView={isInView}
          delay={0}
        />
        <StatCard
          icon={<Earth className="w-8 h-8 text-[#2196F3] stroke-[1.5]" />}
          value={850}
          label="Countries Covered"
          isInView={isInView}
          delay={200}
        />
        <StatCard
          icon={<UserRound className="w-8 h-8 text-[#2196F3] stroke-[1.5]" />}
          value={550}
          label="Happy Clients"
          isInView={isInView}
          delay={400}
        />
        <StatCard
          icon={<PackageOpen className="w-8 h-8 text-[#2196F3] stroke-[1.5]" />}
          value={440}
          label="Tons Of Goods"
          isInView={isInView}
          delay={600}
        />
      </div>
    </section>
    </>
  )
}
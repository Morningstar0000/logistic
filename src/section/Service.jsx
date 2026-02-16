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
  Earth,
  Timer,
  Container,
  Shield,
  ShieldAlert,
  Anchor,
} from "lucide-react";
import { useCountUp } from "../Hooks/useCountUp";
import { useIntersectionObserver } from "../Hooks/useIntersection";
import { useTranslation } from 'react-i18next';

export function Ourservice() {
  const { t } = useTranslation();

  const servicesList = [
    {
      key: "fcl",
      image: "/Fcl.png",
    },
    {
      key: "lcl",
      image: "/Lcl.png",
    },
    {
      key: "port_to_door",
      image: "/port to door.png",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20" id="service">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-blue-500 font-medium mb-4">
            {t('services.title')}
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('services.heading')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service, index) => (
            <div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center transition-all duration-300 ease-in-out 
                        hover:scale-[1.03] hover:shadow-xl group"
              key={index}
            >
              {/* Small Circular Image Container */}
              <div
                className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6
                          transition-all duration-300 ease-in-out 
                          transform group-hover:scale-110 group-hover:rotate-12 overflow-hidden border-4 border-white shadow-md"
              >
                <img
                  src={service.image}
                  alt={t(`services.services_list.${service.key}.alt`)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=${index}`;
                  }}
                />
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {t(`services.services_list.${service.key}.title`)}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {t(`services.services_list.${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const { t } = useTranslation();
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

  const features = [
    {
      key: "experience",
      icon: <Calendar className="w-8 h-8 md:w-10 md:h-10" />,
      bgColor: "bg-amber-50",
    },
    {
      key: "tracking",
      icon: <Timer className="w-8 h-8 md:w-10 md:h-10" />,
      bgColor: "bg-amber-50",
    },
    {
      key: "ports",
      icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />,
      bgColor: "bg-red-50",
    },
    {
      key: "safety",
      icon: <ShieldAlert className="w-8 h-8 md:w-10 md:h-10" />,
      bgColor: "bg-blue-50",
    },
  ];

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
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="text-blue-500 font-medium tracking-wide uppercase text-sm md:text-base">
              {t('why_choose_us.title')}
            </h3>

            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 leading-tight">
              {t('why_choose_us.heading')}
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {t('why_choose_us.description')}
            </p>

            {/* Simple Grid instead of Carousel for Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} p-5 rounded-lg hover:shadow-md transition-shadow min-h-[140px]`}
                >
                  <div className="text-blue-500 mb-3">{feature.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">
                    {t(`why_choose_us.features.${feature.key}`)}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src="warehouse.png"
                alt={t('why_choose_us.image_alt')}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard for Achievement
const StatCard = ({ icon, value, label, isInView, delay = 0 }) => {
  const count = useCountUp({
    end: value,
    start: 0,
    duration: 2000,
    delay,
    isInView,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="bg-blue-50 p-4 rounded-full mb-4">{icon}</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
        {count} +
      </h2>
      <p className="text-blue-600 font-medium">{label}</p>
    </div>
  );
};

// AchievementSection
export function AchievementSection() {
  const { t } = useTranslation();
  const [sectionRef, isInView] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true,
  });

  const achievements = [
    {
      icon: <Box className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      value: 1200,
      labelKey: "packages"
    },
    {
      icon: <Earth className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      value: 110,
      labelKey: "countries"
    },
    {
      icon: <UserRound className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      value: 550,
      labelKey: "clients"
    },
    {
      icon: <Anchor className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      value: 8500,
      labelKey: "goods"
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <StatCard
              key={index}
              icon={achievement.icon}
              value={achievement.value}
              label={t(`achievements.${achievement.labelKey}`)}
              isInView={isInView}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
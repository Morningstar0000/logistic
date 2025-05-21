"use client"

import { useState, useEffect, useRef } from "react";
import { Truck, User } from "lucide-react";
import { RequestAquote, TrackAndTrace } from "../component/FormInput";

export default function ShippingForm() {
  const [activeTab, setActiveTab] = useState("track");
  const [transformY, setTransformY] = useState(0);
  const sectionRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        const sectionStart = sectionTop - windowHeight;
        const sectionEnd = sectionTop + sectionHeight;

        if (scrollPosition > sectionStart && scrollPosition < sectionEnd) {
          const progress = (scrollPosition - sectionStart) / (windowHeight + sectionHeight);
          const maxMovement = sectionHeight * 0.3;
          setTransformY(progress * maxMovement);
        } else if (scrollPosition <= sectionStart) {
          setTransformY(0);
        } else if (scrollPosition >= sectionEnd) {
          setTransformY(maxMovement);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-50 z-0 overflow-hidden"
        style={{
          transform: `translateY(${transformY}px)`,
          willChange: "transform",
          transition: "transform 0.1s ease-out",
          height: "130%",
          top: "-15%"
        }}
      >
        <picture>
          <source srcSet="/formrequest.avif" type="image/avif" />
          <source srcSet="/formrequest.webp" type="image/webp" />
          <img
            src="/formrequest.jpg"
            alt="Form request background"
            className="object-cover w-full h-full"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0" style={{
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(15, 23, 42, 0.7)"
        }} />
      </div>

      {/* Form container */}
      <div className="bg-white rounded-lg shadow-xl w-full xl:mx-24 mx-7 xl:my-24 my-9 z-10 relative">
        <div className="flex border-b">
          <button
            className={`flex items-center gap-2 py-4 px-6 font-medium ${
              activeTab === "track" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleTabChange("track")}
          >
            <Truck className="h-5 w-5" />
            Track & Trace
          </button>
          <button
            className={`flex items-center gap-2 py-4 px-6 font-medium ${
              activeTab === "quote" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleTabChange("quote")}
          >
            <User className="h-5 w-5" />
            Request A Quote
          </button>
        </div>

        {/* Animated content area */}
        <div className="relative p-6 overflow-hidden" style={{ minHeight: '400px' }}>
          <div className={`transition-all duration-600 ease-in-out ${
            activeTab === "track" 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-full absolute"
          }`}>
            <TrackAndTrace />
          </div>
          
          <div className={`transition-all duration-600 ease-in-out ${
            activeTab === "quote" 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-full absolute"
          }`}>
            <RequestAquote />
          </div>
        </div>
      </div>
    </div>
  );
}
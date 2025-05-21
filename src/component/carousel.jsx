"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronRight } from "lucide-react"
import { testimonials } from "../data/testimonial"

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)


  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [testimonials.length])

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const goToSlide = (index) => {
    setActiveIndex(index)
    // Reset timer when manually changing slides
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      if (!isPaused) {
        intervalRef.current = setInterval(nextSlide, 5000)
      }
    }
  }

  // Set up automatic sliding
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, nextSlide])

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Carousel Container */}
      <div className="relative h-[500px] md:h-[400px] overflow-x-hidden">
        {/* Slides */}
        {testimonials.map((testimonial, index) => {
          // Calculate position relative to active slide
          const position = index - activeIndex

          // Determine if this is the active slide
          const isActive = index === activeIndex

          // Calculate transform values based on position
          let translateX = "0%"
          let scale = 1
          let opacity = 1
          let zIndex = 30

          if (position < 0) {
            // Left side
            translateX = "-60%"
            scale = 0.85
            opacity = 0.15 // Very light opacity
            zIndex = 10
          } else if (position > 0) {
            // Right side
            translateX = "60%"
            scale = 0.85
            opacity = 0.15 // Very light opacity
            zIndex = 10
          }

          return (
            <div
              key={testimonial.id}
              className={`absolute top-0 md:left-[45%] md:ml-[-12rem] left-[0%] ml-[0rem] right-0 mx-auto w-full max-w-md transition-all duration-500 bg-white rounded-lg `}
              style={{
                transform: `translateX(${translateX}) scale(${scale})`,
                opacity,
                zIndex,
                boxShadow: isActive
                  ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="p-6 flex flex-col items-center text-center">
                {/* Profile Image */}
                <div
                  className={`w-24 h-24 rounded-full border-2 ${
                    isActive ? "border-blue-300" : "border-gray-200"
                  } overflow-hidden mb-4 shadow-md`}
                >
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{testimonial.title}</h3>

                {/* Content */}
                <p className="text-gray-500 mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque animi voluptatum repudiandae
                  exercitationem, deserunt, perferendis a sequi maiores reprehenderit quaerat et assumenda dolores
                  dolorem
                </p>

                {/* Name */}
                <h4 className="text-lg font-medium text-gray-700">{testimonial.name}</h4>

                {/* Role */}
                <p className="text-sm text-blue-500">{testimonial.role}</p>
              </div>
            </div>
          )
        })}

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-40"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-blue-400 transition-all ${
              activeIndex === index ? "bg-blue-500" : "bg-transparent"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

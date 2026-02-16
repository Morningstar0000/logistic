"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronRight, Quote } from "lucide-react"
import { testimonials as testimonialData } from "../data/testimonial"
import { useTranslation } from 'react-i18next'

export default function Carousel() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  // Map testimonials with translations
  const testimonials = testimonialData.map(testimonial => ({
    ...testimonial,
    title: t(testimonial.title),
    content: t(testimonial.content),
    position: t(testimonial.position),
    // Image paths remain the same
    image: testimonial.image
  }))

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [testimonials])

  const goToSlide = (index) => {
    setActiveIndex(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      if (!isPaused) {
        intervalRef.current = setInterval(nextSlide, 5000)
      }
    }
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, nextSlide])

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-12 bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
        <Quote size={180} className="text-blue-500" />
      </div>

      {/* FIXED: Increased height to prevent clipping */}
      <div className="relative h-[550px] md:h-[500px] flex items-center justify-center overflow-visible">
        {testimonials.map((testimonial, index) => {
          const position = index - activeIndex
          const isActive = index === activeIndex

          let translateX = "0%"
          let scale = 1
          let opacity = 1
          let zIndex = 30

          if (position < 0) {
            translateX = "-65%"
            scale = 0.8
            opacity = 0.3
            zIndex = 10
          } else if (position > 0) {
            translateX = "65%"
            scale = 0.8
            opacity = 0.3
            zIndex = 10
          }

          return (
            <div
              key={testimonial.id}
              className={`absolute md:w-[380px] w-[300px] transition-all duration-700 ease-in-out bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl`}
              style={{
                transform: `translateX(${translateX}) scale(${scale})`,
                opacity,
                zIndex,
                visibility: Math.abs(position) > 1 ? 'hidden' : 'visible' 
              }}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full border-4 transition-colors duration-500 ${
                    isActive ? "border-orange-500" : "border-slate-700"
                  } overflow-hidden mb-6 shadow-xl`}
                >
                  <img
                    src={`/${testimonial.image}`}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.onerror = null
                      e.target.src = `https://via.placeholder.com/80/1e293b/94a3b8?text=${testimonial.name.charAt(0)}`
                    }}
                  />
                </div>

                <h3 className="text-white font-bold mb-3 uppercase tracking-wide text-sm">
                  {testimonial.title}
                </h3>

                <p className="text-slate-400 italic mb-6 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="mt-auto">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest">
                    {testimonial.name}
                  </h4>
                  <p className="text-orange-500 text-[10px] font-black mt-1 uppercase">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Navigation Button */}
        <button
          onClick={nextSlide}
          className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 bg-orange-500 p-4 rounded-full shadow-2xl hover:bg-orange-600 transition-all z-40 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index ? "w-8 h-2 bg-orange-500" : "w-2 h-2 bg-slate-700 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
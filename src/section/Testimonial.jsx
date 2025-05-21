"use client"

import { useState } from "react"
import Carousel from "../component/carousel"

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] = useState(1)
  return (
    <div className="align-element bg-white py-15 md:py-12 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 ">
          <h3 className="text-blue-500 font-medium mb-2 text-sm md:text-base">OUR TESTIMONIALS</h3>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Let's Know About All Of Our Client Says
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit porro, aliquid reprehenderit iusto inventore
            sint beatae ipsum impedit in sit numquam illum distinctio sequi quisquam et hic tempore
          </p>
        </div>
            {/* TestimonialCard */}
            <Carousel/>
      </div>
    </div>
  )
}

export default TestimonialsSection

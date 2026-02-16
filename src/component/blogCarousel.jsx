"use client"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { blogPosts } from "../data/blog"

const BlogCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  
  // Calculate number of slides needed (showing 3 posts per slide on desktop)
  const postsPerSlide = isMobile ? 1 : 3
  const totalSlides = Math.ceil(blogPosts.length / postsPerSlide)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides])

  // Handle manual navigation
  const goToSlide = (index) => {
    setActiveSlide(index)
  }

 // Detect mobile view
 useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 769) // Tailwind's md breakpoint
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return (
    <>
  
      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {/* Generate slides */}
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            // Get posts for this slide
            const startIdx = slideIndex * postsPerSlide
            const endIdx = Math.min(startIdx + postsPerSlide, blogPosts.length)
            const slidePosts = blogPosts.slice(startIdx, endIdx)

            return (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-0 h-[500px]">
                  {slidePosts.map((post) => (
                    <div key={post.id} className="bg-white overflow-x-hidden rounded-lg shadow-sm border border-gray-100 w-[100%] ">
                      <div className="h-40 relative">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-blue-500 mb-2">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.description}</p>
                        <a
                          href="#"
                          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Add empty placeholders if needed to maintain grid layout */}
                  {slidePosts.length < postsPerSlide &&
                    Array.from({ length: postsPerSlide - slidePosts.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="hidden md:block"></div>
                    ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation arrows - only show if there's more than one slide */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={() => goToSlide((activeSlide - 1 + totalSlides) % totalSlides)}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-transparent p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-10"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => goToSlide((activeSlide + 1) % totalSlides)}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-transparent p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-10"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Carousel indicators - only show if there's more than one slide */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 mx-1 rounded-full transition-colors ${
                  activeSlide === index ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      </>
  )
}

export default BlogCarousel

"use client"

import { useState, useEffect, useRef } from "react"

export const useIntersectionObserver = ({ 
  threshold = 0.1, 
  rootMargin = "0px",
  triggerOnce = false 
} = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && hasTriggered.current) return
        
        setIsInView(entry.isIntersecting)
        
        if (entry.isIntersecting) {
          hasTriggered.current = true
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}
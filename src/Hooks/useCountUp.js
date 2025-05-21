"use client"

import { useState, useEffect, useRef } from "react"

export const useCountUp = ({ end, start = 0, duration = 2000, delay = 0, isInView = true }) => {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const timeRef = useRef(null)
  const startTimeRef = useRef(null)
  const hasAnimatedRef = useRef(false) // Track if animation has run

  useEffect(() => {
    // Only run if in view and hasn't animated before
    if (!isInView || hasAnimatedRef.current) return

    const timeout = setTimeout(() => {
      hasAnimatedRef.current = true // Mark as animated
      startTimeRef.current = null

      const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const progress = timestamp - startTimeRef.current
        const percentage = Math.min(progress / duration, 1)

        // Easing function for smoother animation
        const easeOutQuad = (t) => t * (2 - t)
        const easedProgress = easeOutQuad(percentage)

        const currentCount = Math.floor(start + (end - start) * easedProgress)
        countRef.current = currentCount
        setCount(currentCount)

        if (percentage < 1) {
          timeRef.current = requestAnimationFrame(animate)
        }
      }

      timeRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      if (timeRef.current) {
        cancelAnimationFrame(timeRef.current)
      }
      clearTimeout(timeout)
    }
  }, [end, start, duration, delay, isInView])

  return count
}
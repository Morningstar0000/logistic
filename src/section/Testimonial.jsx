"use client"

import { useState } from "react"
import Carousel from "../component/carousel"
import { MessageSquareQuote } from "lucide-react"
import { useTranslation } from 'react-i18next'

const TestimonialsSection = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full bg-slate-900 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <div className="flex justify-center mb-4">
            <span className="bg-blue-900/40 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] flex items-center gap-2 border border-blue-500/20">
              <MessageSquareQuote size={14} /> {t('testimonials.tagline')}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {t('testimonials.title_part1')}{' '}
            <span className="text-orange-500">{t('testimonials.title_part2')}</span>
          </h2>
          
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('testimonials.description')}
          </p>
        </div>
        
        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Subtle Decorative Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
          
          {/* The Carousel component will need its own translations */}
          <Carousel />
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm font-medium">
            {t('testimonials.trust_note')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
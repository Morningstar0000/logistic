import { CheckCircle, Shield, Ship, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="w-full py-20 bg-white" id="about">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row items-center w-full">
          
          {/* Left side - Dynamic Image Stack */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/About us.png" 
                alt={t('about.alt_images.main')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            {/* Smaller Detail Image (Floating effect) */}
            <div className="hidden md:block absolute -bottom-10 -right-10 w-64 h-64 border-8 border-white rounded-2xl overflow-hidden shadow-2xl z-20">
              <img
                src="/images.jpg"
                alt={t('about.alt_images.secondary')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Elite Content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-2 text-orange-500 text-sm font-bold mb-4 uppercase tracking-[0.2em]">
              <div className="w-10 h-[2px] bg-orange-500" />
              {t('about.tagline')}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              {t('about.title_part1')} <span className="text-blue-600">{t('about.title_part2')}</span>
            </h1>

            <div className="space-y-4 text-slate-600 mb-8 leading-relaxed">
              <p>
                {t('about.description1')}
              </p>
              <p className="font-medium text-slate-800 italic border-l-4 border-orange-500 pl-4">
                "{t('about.quote')}"
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { key: "support", icon: <Globe size={18} /> },
                { key: "security", icon: <Shield size={18} /> },
                { key: "excellence", icon: <Ship size={18} /> },
                { key: "tracking", icon: <CheckCircle size={18} /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md group">
                  <div className="text-blue-600 group-hover:text-orange-500 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {t(`about.features.${item.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
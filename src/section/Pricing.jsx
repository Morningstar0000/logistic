import React from 'react';
import { Plane, Truck, Zap, PackageCheck, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PricingQuote = () => {
  const { t } = useTranslation();

  const features = [
    {
      key: "priority",
      icon: <Zap size={24} />,
    },
    {
      key: "insurance",
      icon: <PackageCheck size={24} />,
    },
  ];

  const tiers = [
    {
      key: "express_docs",
      icon: <Plane size={24} />,
      color: "blue",
    },
    {
      key: "secure_value",
      icon: <PackageCheck size={24} />,
      color: "orange",
      featured: true
    },
    {
      key: "standard_parcel",
      icon: <Truck size={24} />,
      color: "blue",
    },
  ];

  return (
    <section className="bg-slate-900 py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Rapid Quote Info */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              {t('pricing.title_part1')}{' '}
              <span className="text-orange-500">{t('pricing.title_part2')}</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8">
              {t('pricing.description')}
            </p>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.key} className="flex items-start gap-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">
                      {t(`pricing.features.${feature.key}.title`)}
                    </h4>
                    <p className="text-slate-500 text-sm">
                      {t(`pricing.features.${feature.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-800/30 border-l-4 border-orange-500 rounded-r-xl">
              <div className="flex gap-3 text-slate-300 italic">
                <Info className="text-orange-500 shrink-0" size={20} />
                <p className="text-sm italic">
                  {t('pricing.note.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Service Tiers */}
          <div className="lg:w-1/2 grid gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={`${
                  tier.featured 
                    ? 'bg-gradient-to-br from-slate-800 to-blue-900/40 border-2 border-orange-500 shadow-2xl shadow-orange-500/10' 
                    : 'bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-blue-500/50'
                } p-6 rounded-2xl transition-all cursor-pointer group relative`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 right-6 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    {t(`pricing.tiers.${tier.key}.badge`)}
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-4">
                  <div className={`${
                    tier.featured
                      ? 'bg-orange-500 text-white'
                      : `bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white`
                  } p-3 rounded-xl transition-colors`}>
                    {tier.icon}
                  </div>
                  <span className={`${
                    tier.featured ? 'text-white font-bold' : 'text-slate-500'
                  } text-sm`}>
                    {t(`pricing.tiers.${tier.key}.price`)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white">
                  {t(`pricing.tiers.${tier.key}.title`)}
                </h3>
                
                <p className={`${
                  tier.featured ? 'text-blue-100/70' : 'text-slate-400'
                } text-sm mt-2`}>
                  {t(`pricing.tiers.${tier.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingQuote;
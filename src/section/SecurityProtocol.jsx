import React from 'react';
import { ShieldCheck, EyeOff, ClipboardCheck, Fingerprint, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SecurityProtocol = () => {
  const { t } = useTranslation();

  const protocols = [
    {
      key: "packaging",
      icon: <Lock className="w-8 h-8 text-orange-500" />,
    },
    {
      key: "discreet",
      icon: <EyeOff className="w-8 h-8 text-orange-500" />,
    },
    {
      key: "custody",
      icon: <Fingerprint className="w-8 h-8 text-orange-500" />,
    },
    {
      key: "signature",
      icon: <ClipboardCheck className="w-8 h-8 text-orange-500" />,
    },
  ];

  return (
    <section className="bg-slate-900 py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="bg-blue-900/50 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> {t('security.tagline')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            {t('security.title_part1')} <span className="text-orange-500">{t('security.title_part2')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t('security.description')}
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {protocols.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300 group shadow-xl"
            >
              <div className="bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(`security.protocols.${item.key}.title`)}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t(`security.protocols.${item.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-slate-800 p-6 rounded-2xl border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-blue-600 p-2 rounded-full">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">
                {t('security.trust_footer.title')}
              </p>
              <p className="text-slate-400 text-sm">
                {t('security.trust_footer.description')}
              </p>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-orange-500/20">
            {t('security.trust_footer.button')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecurityProtocol;
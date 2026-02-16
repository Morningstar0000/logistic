import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FaqSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  // Get FAQ items from translation
  const faqItems = t('faq.items', { returnObjects: true });

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4 text-orange-500">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('faq.title_part1')}{' '}
            <span className="text-orange-500">{t('faq.title_part2')}</span>
          </h2>
          <p className="text-slate-400">
            {t('faq.description')}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {Array.isArray(faqItems) && faqItems.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/30 transition-all duration-300"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-slate-800 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="text-orange-500 shrink-0" size={20} />
                ) : (
                  <Plus className="text-slate-500 shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-700/50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            {t('faq.contact_cta')}{' '}
            <a 
              href="#contact" 
              className="text-orange-500 hover:underline font-medium"
            >
              {t('faq.contact_link')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
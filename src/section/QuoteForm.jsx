import React, { useState } from 'react';
import { Package, Ship, ArrowRight, Shield, Globe, CheckCircle, Clock, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const QuoteForm = () => {
  const { t } = useTranslation();
  
  // 1. STATE MANAGEMENT
  const [shipType, setShipType] = useState('courier');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500); 
  };

  // 3. SUCCESS COMPONENT
  const SuccessState = () => (
    <div className="p-12 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex justify-center mb-6">
        <div className="bg-blue-500/20 p-4 rounded-full">
          <CheckCircle size={60} className="text-blue-400" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">
        {t('quote_form.success.title')}
      </h2>
      <p className="text-orange-500 font-mono font-bold mb-6 tracking-widest text-lg">
        {t('quote_form.success.reference')} DBC-{Math.floor(Math.random() * 10000)}
      </p>
      
      <div className="bg-slate-900/50 rounded-2xl p-6 mb-8 text-left space-y-4 border border-slate-700 max-w-md mx-auto">
        <div className="flex gap-4">
          <Clock className="text-orange-500 shrink-0" size={20} />
          <p className="text-slate-300 text-sm">
            <span className="text-white font-bold block">
              {t('quote_form.success.review_title')}
            </span>
            {t('quote_form.success.review_description')}
          </p>
        </div>
        <div className="flex gap-4">
          <Shield className="text-blue-400 shrink-0" size={20} />
          <p className="text-slate-300 text-sm">
            <span className="text-white font-bold block">
              {t('quote_form.success.security_title')}
            </span>
            {t('quote_form.success.security_description')}
          </p>
        </div>
      </div>
      <p className="text-slate-400 text-sm mb-8">
        {t('quote_form.success.confirmation')}
      </p>
      <button 
        onClick={() => setIsSubmitted(false)}
        className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
      >
        {t('quote_form.success.another_request')} <ArrowRight size={14} />
      </button>
    </div>
  );

  return (
    <section className="bg-slate-900 py-20 px-6 min-h-[600px] flex items-center justify-center" id='quoteform'>
      <div className="max-w-4xl w-full bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 transition-all duration-500">
        
        {isSubmitted ? (
          <SuccessState />
        ) : (
          <>
            {/* Header & Tab Switcher */}
            <div className="bg-slate-700/30 p-8 border-b border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="text-orange-500" /> {t('quote_form.title')}
              </h2>
              <div className="flex p-1 bg-slate-900 rounded-xl w-full max-w-md">
                <button 
                  type="button"
                  onClick={() => setShipType('courier')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${shipType === 'courier' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Package size={18} /> {t('quote_form.tabs.courier')}
                </button>
                <button 
                  type="button"
                  onClick={() => setShipType('freight')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${shipType === 'freight' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Ship size={18} /> {t('quote_form.tabs.freight')}
                </button>
              </div>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {t('quote_form.labels.route_details')}
                </label>
                <input 
                  required 
                  type="text" 
                  placeholder={t('quote_form.labels.pickup_location')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all" 
                />
                <input 
                  required 
                  type="text" 
                  placeholder={t('quote_form.labels.delivery_location')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {t('quote_form.labels.cargo_info')}
                </label>
                <div className="flex gap-2">
                   <input 
                     required 
                     type="text" 
                     placeholder={shipType === 'courier' 
                       ? t('quote_form.labels.weight_placeholder_courier')
                       : t('quote_form.labels.weight_placeholder_freight')}
                     className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all" 
                   />
                   <input 
                     required 
                     type="text" 
                     placeholder={t('quote_form.labels.value_placeholder')}
                     className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all" 
                   />
                </div>
                
                {/* Dual Conditional Select: Commodity + Incoterm */}
                <div className="space-y-4">
                  <select 
                    required 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">{t('quote_form.labels.commodity')}</option>
                    {shipType === 'courier' ? (
                      <>
                        <option value="documents">
                          {t('quote_form.commodity_options.courier.documents')}
                        </option>
                        <option value="jewelry">
                          {t('quote_form.commodity_options.courier.jewelry')}
                        </option>
                        <option value="electronics">
                          {t('quote_form.commodity_options.courier.electronics')}
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="general">
                          {t('quote_form.commodity_options.freight.general')}
                        </option>
                        <option value="container">
                          {t('quote_form.commodity_options.freight.container')}
                        </option>
                        <option value="machinery">
                          {t('quote_form.commodity_options.freight.machinery')}
                        </option>
                      </>
                    )}
                  </select>

                  {/* MAJOR FREIGHT ONLY: Incoterm Dropdown */}
                  {shipType === 'freight' && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <select 
                        required 
                        className="w-full bg-slate-900 border-2 border-blue-500/30 rounded-lg p-3 text-white focus:border-blue-400 outline-none transition-all cursor-pointer"
                      >
                        <option value="">{t('quote_form.labels.incoterm')}</option>
                        <option value="EXW">
                          {t('quote_form.incoterm_options.EXW')}
                        </option>
                        <option value="FOB">
                          {t('quote_form.incoterm_options.FOB')}
                        </option>
                        <option value="CIF">
                          {t('quote_form.incoterm_options.CIF')}
                        </option>
                        <option value="DDP">
                          {t('quote_form.incoterm_options.DDP')}
                        </option>
                      </select>
                      <p className="flex items-center gap-2 text-[10px] text-blue-400 mt-2 italic px-1">
                        <Info size={12} /> {t('quote_form.labels.incoterm_note')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {shipType === 'courier' && (
                <div className="md:col-span-2 bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="text-blue-400" size={24} />
                    <div>
                      <p className="text-white text-sm font-bold">
                        {t('quote_form.secure_chain.title')}
                      </p>
                      <p className="text-blue-200/50 text-xs italic">
                        {t('quote_form.secure_chain.description')}
                      </p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-orange-500 cursor-pointer" />
                </div>
              )}

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700">
                <input 
                  required 
                  type="email" 
                  placeholder={t('quote_form.labels.email')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all" 
                />
                <input 
                  required 
                  type="tel" 
                  placeholder={t('quote_form.labels.phone')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none transition-all" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="md:col-span-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-orange-500/20"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    {t('quote_form.submit_button.loading')}
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </span>
                ) : (
                  <>
                    {t('quote_form.submit_button.default')} <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default QuoteForm;
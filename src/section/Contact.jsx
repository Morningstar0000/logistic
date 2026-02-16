import React, { useState } from 'react';
import { Mail, Send, ShieldCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../client';

export default function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const features = [
    {
      key: "response_time",
      icon: <Clock size={20} />,
    },
    {
      key: "security_status", 
      icon: <ShieldCheck size={20} />,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage(t('form required'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage(t('error sending mail'));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          email: formData.email,
          message: formData.message
        }
      });

      if (error) throw error;

      // Success
      setStatus('success');
      setFormData({ email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setErrorMessage(t('Error sending message'));
    }
  };

  return (
    <section className="w-full py-20 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#050530] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left Side: Info Panel */}
          <div className="lg:w-1/3 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 italic uppercase tracking-tighter">
                {t('contact.title')}
              </h2>
              <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                {t('contact.description')}
              </p>
              
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.key} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-bold">
                        {t(`contact.features.${feature.key}.label`)}
                      </p>
                      <p className="font-medium text-sm">
                        {t(`contact.features.${feature.key}.value`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs text-blue-200">
                {t('contact.official_channel')}
              </p>
              <p className="text-lg font-bold">
                deepbluecargo@gmail.com
              </p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="lg:w-2/3 p-8 md:p-12 bg-[#050530]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {t('contact.form.email_label')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.email_placeholder')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {t('contact.form.message_label')}
                  </label>
                  <textarea 
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message_placeholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none disabled:opacity-50"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20">
                  <CheckCircle size={20} />
                  <p className="text-sm font-medium">
                    {t('success_message')}
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="group w-full md:w-fit bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-10 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    {t('contact.form.submit_button')}
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Additional Info */}
              <p className="text-xs text-slate-500 mt-4">
                {t('privacy_note')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}